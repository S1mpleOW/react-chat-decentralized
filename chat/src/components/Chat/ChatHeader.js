import React, { useState } from "react";
import PortalLayout from "../PortalLayout";
import Skeleton from "../skeleton/Skeleton";
import ConversationSetting from "./ConversationSetting";
import MediaView from "./MediaView";

const ChatHeader = () => {
  const [loading, setLoading] = useState(false);
  const [isConversationSettingsOpened, setIsConversationSettingsOpened] =
    useState(false);
  const [isViewMediaOpened, setIsViewMediaOpened] = useState(false);
  return (
    <>
      <div className="flex items-center justify-between h-[73px] px-5 border-b border-dark-green dark:border-dark-green-lighter">
        <div className="flex items-center flex-grow gap-3">
          {loading ? (
            <Skeleton width="40px" height="40px" radius="100%" />
          ) : (
            <>
              <img
                src="https://source.unsplash.com/random"
                className="w-10 h-10 rounded-full"
                alt="avatar"
              />
              <p>Name</p>
            </>
          )}
        </div>

        {!loading && (
          <div className="flex justify-center items-center mr-12">
            <div className="w-[80px]">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsConversationSettingsOpened(true);
                }}
              >
                <i className="text-2xl bx bxs-info-circle text-primary"></i>
              </button>
            </div>

            <div className="w-[80px]">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  window.open(
                    "/video_chat/create",
                    "_blank",
                    "noopener,noreferrer"
                  );
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-[#0D90F3] mt-1"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
                </svg>
              </button>
            </div>
          </div>
        )}
      </div>

      <PortalLayout
        isOpened={isConversationSettingsOpened}
        setIsOpened={setIsConversationSettingsOpened}
      >
        <ConversationSetting
          setIsOpened={setIsConversationSettingsOpened}
          setMediaViewOpened={setIsViewMediaOpened}
        ></ConversationSetting>
      </PortalLayout>

      <PortalLayout
        isOpened={isViewMediaOpened}
        setIsOpened={setIsViewMediaOpened}
      >
        <MediaView setIsOpened={setIsViewMediaOpened}></MediaView>
      </PortalLayout>
    </>
  );
};

export default ChatHeader;
