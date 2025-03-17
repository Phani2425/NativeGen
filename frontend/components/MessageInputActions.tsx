import { CopyPlus, Globe, Pencil, ScanEye, SwatchBook } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { SiYoutube, SiReddit } from "@icons-pack/react-simple-icons";
import { Popover, Transition } from "@headlessui/react";
import { Fragment } from "react";

export const Attach = () => {
  return (
    <button
      type="button"
      className="p-2 text-white/50 rounded-xl hover:bg-zinc-800 transition duration-200 hover:text-white"
    >
      <CopyPlus className="h-5 w-5" />
    </button>
  );
};

const focusModes = [
  {
    key: "webSearch",
    title: "All",
    description: "Searches across all of the internet",
    icon: <Globe className="h-5 w-5" />,
  },
  {
    key: "academicSearch",
    title: "Academic",
    description: "Search in published academic papers",
    icon: <SwatchBook className="h-5 w-5" />,
  },
  {
    key: "writingAssistant",
    title: "Writing",
    description: "Chat without searching the web",
    icon: <Pencil className="h-5 w-5" />,
  },
  {
    key: "youtubeSearch",
    title: "Youtube",
    description: "Search and watch videos",
    icon: (
      <SiYoutube
        className="h-5 w-5 mr-0.5"
        onPointerEnter={undefined}
        onPointerLeave={undefined}
      />
    ),
  },
  {
    key: "redditSearch",
    title: "Reddit",
    description: "Search for discussions and opinions",
    icon: (
      <SiReddit
        className="h-5 w-5 mr-0.5"
        onPointerEnter={undefined}
        onPointerLeave={undefined}
      />
    ),
  },
];

export const Focus = ({
  focusMode,
  setFocusMode,
}: {
  focusMode: string;
  setFocusMode: (mode: string) => void;
}) => {
  return (
    <Popover className="relative">
      {({ open }) => (
        <>
          <Popover.Button
            type="button"
            className={cn(
              "p-2 rounded-xl transition duration-200 flex items-center justify-center",
              "hover:bg-zinc-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500",
              open ? "bg-zinc-800 text-white" : "text-white/70"
            )}
          >
            {focusMode !== "webSearch" ? (
              <div className="flex flex-row items-center space-x-1.5">
                {focusModes.find((mode) => mode.key === focusMode)?.icon}
                <p className="text-xs font-medium">
                  {focusModes.find((mode) => mode.key === focusMode)?.title}
                </p>
              </div>
            ) : (
              <ScanEye className="h-5 w-5" />
            )}
          </Popover.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Popover.Panel className="absolute z-50 mt-2 w-[280px] sm:w-[350px] md:w-[450px] transform -translate-x-1/2 left-1/2">
              <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1 bg-zinc-900 border border-zinc-800 rounded-lg w-full p-2">
                  {focusModes.map((mode, i) => (
                    <div
                      onClick={() => setFocusMode(mode.key)}
                      key={i}
                      className={cn(
                        "p-2.5 rounded-lg flex flex-col items-start justify-start space-y-1.5 cursor-pointer transition-all duration-200",
                        focusMode === mode.key 
                          ? "bg-zinc-800 ring-1 ring-blue-500/50" 
                          : "hover:bg-zinc-800/70"
                      )}
                    >
                      <div
                        className={cn(
                          "flex flex-row items-center space-x-2",
                          focusMode === mode.key ? "text-blue-400" : "text-white"
                        )}
                      >
                        <span className="flex-shrink-0">{mode.icon}</span>
                        <p className="text-sm font-medium">{mode.title}</p>
                      </div>
                      <p className="text-zinc-400 text-xs leading-tight">{mode.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
};

export const CopilotToggle = ({
  copilotEnabled,
  setCopilotEnabled,
}: {
  copilotEnabled: boolean;
  setCopilotEnabled: (enabled: boolean) => void;
}) => {
  return (
    <div className="flex items-center space-x-2 px-1.5">
      <div className="z-10">
        <div className="p-1 -m-1">
          <Switch 
            checked={copilotEnabled} 
            onCheckedChange={setCopilotEnabled}
            className="data-[state=checked]:bg-blue-500" 
          />
        </div>
      </div>
      <p
        onClick={() => setCopilotEnabled(!copilotEnabled)}
        className={cn(
          "text-xs font-medium select-none cursor-pointer",
          copilotEnabled
            ? "text-blue-400"
            : "text-zinc-400 hover:text-zinc-300"
        )}
      >
        Copilot
      </p>
    </div>
  );
};