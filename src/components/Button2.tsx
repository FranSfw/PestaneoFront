import React from 'react';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


export function Button2() {

    return (
      <>
        <button
          id={id}
          className="group flex items-center max-w-[224px] max-h-[96px] place-content-center p-4 bg-primaryBlack border-gray-200 rounded-lg shadow-xs hover:bg-primaryYellow focus:primaryYellow transition-all hover:duration-150 focus:duration-150"
        >
          <div>
            <p className="my-2 text-xl font-medium text-white group-hover:text-primaryBlack group-focus:text-gray-400 transition-all hover:duration-150 focus:duration-150">
              {text}
            </p>
          </div>
        </button>
      </>
    );
}
