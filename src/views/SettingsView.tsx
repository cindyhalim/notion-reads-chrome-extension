import React from "react";
import { Button } from "../components";
import LoadingView from "../components/LoadingView";
import {
  IS_LOWERCASE_KEY,
  TOKEN_KEY,
  WORKSPACE_EMOJI_KEY,
  WORKSPACE_NAME_KEY,
} from "../utils/constants";

type SettingsProps = {
  onBackClick: () => void;
};
export default function Settings({ onBackClick }: SettingsProps) {
  const [isLowercaseChecked, setIsLowercaseChecked] = React.useState<
    boolean | null
  >(null);

  React.useEffect(() => {
    async function getIsLowercase() {
      const isLowercase = await chrome.storage.sync
        .get(IS_LOWERCASE_KEY)
        .then((value): boolean => value?.[IS_LOWERCASE_KEY] || false);
      setIsLowercaseChecked(isLowercase);
    }

    getIsLowercase();
  }, []);

  if (isLowercaseChecked === null) {
    return <LoadingView>Loading...</LoadingView>;
  }

  async function handleOnChange() {
    const newVal = !isLowercaseChecked;
    setIsLowercaseChecked(newVal);
    await chrome.storage.sync.set({
      [IS_LOWERCASE_KEY]: newVal,
    });
  }

  async function logout() {
    await chrome.storage.sync.remove([
      TOKEN_KEY,
      WORKSPACE_NAME_KEY,
      WORKSPACE_EMOJI_KEY,
    ]);
  }

  return (
    <div className="h-[80%] p-5">
      <p
        className="cursor-pointer hover:underline underline-offset-2 mb-6 text-sm"
        onClick={onBackClick}
      >
        {"< Back"}
      </p>
      <h3 className="font-semibold text-lg mb-6">Settings</h3>
      <div className="flex mb-4">
        <div className="flex items-center h-5">
          <input
            id="lowercase-checkbox"
            aria-describedby="lowercase-checkbox-text"
            checked={isLowercaseChecked}
            onChange={handleOnChange}
            className="w-4 h-4 focus:outline-none"
            type="checkbox"
          />
        </div>
        <div className="ml-2 text-sm mb-2">
          <label
            htmlFor="lowercase-checkbox"
            className="font-medium text-gray-900 dark:text-gray-300"
          >
            lowercase book details
          </label>
          <p
            id="lowercase-checkbox-text"
            className="text-xs font-normal text-gray-500 dark:text-gray-300"
          >
            save notion book details in lowercase
          </p>
        </div>
      </div>
      <Button onClick={logout}>log out</Button>
    </div>
  );
}
