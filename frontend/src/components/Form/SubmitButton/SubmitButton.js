import React from 'react';

function SubmitButton({ text, disabled }) {
  const baseClasses =
    'font-bold py-2 px-4 rounded transition-colors duration-200';

  const enabledClasses =
    'bg-blue-500 hover:bg-blue-700 text-white cursor-pointer';

  const disabledClasses = 'bg-gray-300 text-gray-400 cursor-not-allowed';

  return (
    <button
      type="submit"
      className={`${baseClasses} ${
        disabled ? disabledClasses : enabledClasses
      }`}
      disabled={disabled}
    >
      {text}
    </button>
  );
}

export default SubmitButton;
