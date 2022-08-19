import IconButton from '@mui/material/IconButton';

import { useState, useRef } from 'react';

import { ReactComponent as HangupIcon } from '../icon/icons/hangup.svg';
import { ReactComponent as VideoIcon } from '../icon/icons/video.svg';
import { ReactComponent as MicIcon } from '../icon/icons/mic.svg';
import { ReactComponent as NoVideoIcon } from '../icon/icons/no-video.svg';
import { ReactComponent as NoMicIcon } from '../icon/icons/no-mic.svg';
import { ReactComponent as CopyIcon } from '../icon/icons/copy.svg';
import { ReactComponent as MoreIcon } from '../icon/icons/more-vertical.svg';
import { fireStore, peerConnect } from './VideoSetups';

function VideoCall() {
	const mode = window.location.pathname.split('/').pop();
	const firestore = fireStore;
	const pc = peerConnect;

	const [webcamActive, setWebcamActive] = useState(false);
	const [roomId, setRoomId] = useState(null);
	const [switchVideo, setSwitchVideo] = useState({
		mic_switch: true,
		video_switch: true,
	});

	const localRef = useRef();
	const remoteRef = useRef();

	const setupSources = async () => {
		const localStream = await navigator.mediaDevices.getUserMedia({
			video: true,
			audio: true,
		});
		const remoteStream = new MediaStream();

		localStream.getTracks().forEach((track) => {
			pc.addTrack(track, localStream);
		});

		pc.ontrack = (event) => {
			event.streams[0].getTracks().forEach((track) => {
				remoteStream.addTrack(track);
			});
		};

		localRef.current.srcObject = localStream;
		remoteRef.current.srcObject = remoteStream;

		setWebcamActive(true);

		if (mode === 'create') {
			const callDoc = firestore.collection('calls').doc();

			const offerCandidates = callDoc.collection('offerCandidates');
			const answerCandidates = callDoc.collection('answerCandidates');

			setRoomId(callDoc.id);
			console.log('RoomID ~ videos ~ 48: ' + callDoc.id);

			pc.onicecandidate = (event) => {
				event.candidate && offerCandidates.add(event.candidate.toJSON());
			};

			const offerDescription = await pc.createOffer();
			await pc.setLocalDescription(offerDescription);

			const offer = {
				sdp: offerDescription.sdp,
				type: offerDescription.type,
			};

			await callDoc.set({ offer });

			callDoc.onSnapshot((snapshot) => {
				const data = snapshot.data();
				if (!pc.currentRemoteDescription && data?.answer) {
					const answerDescription = new RTCSessionDescription(data.answer);
					pc.setRemoteDescription(answerDescription);
				}
			});

			answerCandidates.onSnapshot((snapshot) => {
				snapshot.docChanges().forEach((change) => {
					if (change.type === 'added') {
						const candidate = new RTCIceCandidate(change.doc.data());
						pc.addIceCandidate(candidate);
					}
				});
			});
		} else {
			if (!mode) return;
			const callDoc = firestore.collection('calls').doc(mode);
			const answerCandidates = callDoc.collection('answerCandidates');
			const offerCandidates = callDoc.collection('offerCandidates');

			pc.onicecandidate = (event) => {
				event.candidate && answerCandidates.add(event.candidate.toJSON());
			};

			const callData = (await callDoc.get()).data();

			const offerDescription = callData.offer;
			await pc.setRemoteDescription(new RTCSessionDescription(offerDescription));

			const answerDescription = await pc.createAnswer();
			await pc.setLocalDescription(answerDescription);

			const answer = {
				type: answerDescription.type,
				sdp: answerDescription.sdp,
			};

			await callDoc.update({ answer });

			offerCandidates.onSnapshot((snapshot) => {
				snapshot.docChanges().forEach((change) => {
					if (change.type === 'added') {
						let data = change.doc.data();
						pc.addIceCandidate(new RTCIceCandidate(data));
					}
				});
			});
		}

		pc.onconnectionstatechange = (event) => {
			if (pc.connectionState === 'disconnected') {
				setRoomId('');
				hangUp();
			}
		};
	};

	function toggleVideo() {
		if (
			localRef.current.srcObject != null &&
			localRef.current.srcObject.getVideoTracks().length > 0
		) {
			localRef.current.srcObject.getVideoTracks()[0].enabled = !switchVideo.video_switch;
			setSwitchVideo({
				mic_switch: switchVideo.mic_switch,
				video_switch: !switchVideo.video_switch,
			});
		}
	}

	function toggleMic() {
		if (
			localRef.current.srcObject != null &&
			localRef.current.srcObject.getAudioTracks().length > 0
		) {
			localRef.current.srcObject.getAudioTracks()[0].enabled = !switchVideo.mic_switch;
			setSwitchVideo({
				mic_switch: !switchVideo.mic_switch,
				video_switch: switchVideo.video_switch,
			});
		}
	}

	const hangUp = async () => {
		pc.close();

		if (roomId) {
			let roomRef = firestore.collection('calls').doc(roomId);
			await roomRef
				.collection('answerCandidates')
				.get()
				.then((querySnapshot) => {
					querySnapshot.forEach((doc) => {
						doc.ref.delete();
					});
				});
			await roomRef
				.collection('offerCandidates')
				.get()
				.then((querySnapshot) => {
					querySnapshot.forEach((doc) => {
						doc.ref.delete();
					});
				});

			await roomRef.delete();
		}

		window.close();
	};

	return (
		<div className="videos">
			<video ref={localRef} autoPlay playsInline className="local" muted />
			<video ref={remoteRef} autoPlay playsInline className="remote" />

			<div className="buttonsContainer">
				<IconButton
					onClick={toggleMic}
					className="mute-Btn"
					size="medium"
					style={
						switchVideo.mic_switch ? { backgroundColor: 'white' } : { backgroundColor: '#ff694f' }
					}
				>
					{switchVideo.mic_switch && <MicIcon fontSize="medium" />}
					{!switchVideo.mic_switch && <NoMicIcon fontSize="medium" />}
				</IconButton>

				{/* Video btn */}
				<IconButton
					onClick={toggleVideo}
					className="camera-Btn"
					size="medium"
					style={
						switchVideo.video_switch ? { backgroundColor: 'white' } : { backgroundColor: '#ff694f' }
					}
				>
					{switchVideo.video_switch && <VideoIcon />}
					{!switchVideo.video_switch && <NoVideoIcon />}
				</IconButton>

				{/* Hang up btn */}
				<IconButton onClick={hangUp} size="medium" className="hangup-Btn">
					<HangupIcon />
				</IconButton>

				<div tabIndex={0} role="button" className="more button">
					<div className="mt-1 ml-1 text-center text-black">
						<MoreIcon />
					</div>

					<div className="z-50 w-2/3 px-3 popover">
						{/* hard code link */}
						<button
							onClick={() => {
								const joinCode = 'http://localhost:3000/video_chat/' + roomId;
								navigator.clipboard.writeText(joinCode);
							}}
							className="z-50 ml-4 text-black hover:bg-slate-90"
						>
							Copy join code
						</button>
					</div>
				</div>
			</div>

			{!webcamActive && (
				<div className="modalContainer">
					<div className="modal">
						<h3 className="text-black">Turn on your camera and microphone and start the call</h3>
						<div className="container">
							<button
								onClick={() => {
									window.close();
								}}
								className="secondary"
							>
								<span className="text-black">Quit</span>
							</button>
							<button
								className="bg-[#0D90F3] py-2 px-3 rounded-lg text-white"
								onClick={setupSources}
							>
								Start
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}

export default VideoCall;
