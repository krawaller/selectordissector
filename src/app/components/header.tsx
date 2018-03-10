import * as PropTypes from "prop-types";
import * as React from "react";

import {
  Toolbar,
  ToolbarIcon,
  ToolbarRow,
  ToolbarSection,
  ToolbarTitle,
} from "rmwc/Toolbar";

const GeneralInfo = (
  <React.Fragment>
    <p>
      Crafted by <a href="http://blog.krawaller.se" target="_blank">Krawaller</a> and <a href="https://twitter.com/litenjacob">LitenJacob</a> using <a href="https://reactjs.org/" target="_blank">React</a>
      , <a href="https://jamesmfriedman.github.io/rmwc/" target="_blank">RMWC</a>
      , <a href="https://www.typescriptlang.org/" target="_blank">TypeScript</a> and &hearts;.
    </p>
    <p>
      Come see us at <a href="http://edument.se" target="_blank">Edument</a> for high-quality training
      in all of the above techniques. For example you can treat your team to
      a <a href="https://edument.se/en/education/categories/web-development-courses/reactjs-prague">weekend of React and beer in Prague</a>!
    </p>
    <p>
      Found something amiss in the app, or want to contribute? Head over to
      the <a href="https://github.com/krawaller/selectordissector" target="_blank">repo</a> and
      file an issue or make a PR!
    </p>
  </React.Fragment>
);

import { DialogContext } from "./main";

const Header: React.StatelessComponent<{}> = (props, {openDialog}: DialogContext) => (
  <Toolbar>
    <ToolbarRow>
      <ToolbarSection alignStart>
        <ToolbarTitle>Selector Dissector</ToolbarTitle>
      </ToolbarSection>
      <ToolbarSection alignEnd>
        <ToolbarIcon
          onClick={() => openDialog("What's this?", GeneralInfo)}
          use={
            <svg
              style={{ width: "24px", height: "24px" }}
              viewBox="0 0 24 24"
            >
              <path
                fill="#ffffff"
                d="M11.812,0C5.289,0,0,5.289,0,11.812s5.289,11.813,11.812,11.813s11.813-5.29,11.813-11.813 S18.335,0,11.812,0z M14.271,18.307c-0.608,0.24-1.092,0.422-1.455,0.548c-0.362,0.126-0.783,0.189-1.262,0.189 c-0.736,0-1.309-0.18-1.717-0.539s-0.611-0.814-0.611-1.367c0-0.215,0.015-0.435,0.045-0.659c0.031-0.224,0.08-0.476,0.147-0.759 l0.761-2.688c0.067-0.258,0.125-0.503,0.171-0.731c0.046-0.23,0.068-0.441,0.068-0.633c0-0.342-0.071-0.582-0.212-0.717 c-0.143-0.135-0.412-0.201-0.813-0.201c-0.196,0-0.398,0.029-0.605,0.09c-0.205,0.063-0.383,0.12-0.529,0.176l0.201-0.828 c0.498-0.203,0.975-0.377,1.43-0.521c0.455-0.146,0.885-0.218,1.29-0.218c0.731,0,1.295,0.178,1.692,0.53 c0.395,0.353,0.594,0.812,0.594,1.376c0,0.117-0.014,0.323-0.041,0.617c-0.027,0.295-0.078,0.564-0.152,0.811l-0.757,2.68 c-0.062,0.215-0.117,0.461-0.167,0.736c-0.049,0.275-0.073,0.485-0.073,0.626c0,0.356,0.079,0.599,0.239,0.728 c0.158,0.129,0.435,0.194,0.827,0.194c0.185,0,0.392-0.033,0.626-0.097c0.232-0.064,0.4-0.121,0.506-0.17L14.271,18.307z M14.137,7.429c-0.353,0.328-0.778,0.492-1.275,0.492c-0.496,0-0.924-0.164-1.28-0.492c-0.354-0.328-0.533-0.727-0.533-1.193 c0-0.465,0.18-0.865,0.533-1.196c0.356-0.332,0.784-0.497,1.28-0.497c0.497,0,0.923,0.165,1.275,0.497 c0.353,0.331,0.53,0.731,0.53,1.196C14.667,6.703,14.49,7.101,14.137,7.429z"
              />
            </svg>
          }
        />
        <ToolbarIcon
          tag="a"
          href="https://github.com/krawaller/selectordissector"
          target="_blank"
          use={
            <svg
              style={{ width: "24px", height: "24px" }}
              viewBox="0 0 24 24"
            >
              <path
                fill="#ffffff"
                d="M12,2A10,10 0 0,0 2,12C2,16.42 4.87,20.17 8.84,21.5C9.34,21.58 9.5,21.27 9.5,21C9.5,20.77 9.5,20.14 9.5,19.31C6.73,19.91 6.14,17.97 6.14,17.97C5.68,16.81 5.03,16.5 5.03,16.5C4.12,15.88 5.1,15.9 5.1,15.9C6.1,15.97 6.63,16.93 6.63,16.93C7.5,18.45 8.97,18 9.54,17.76C9.63,17.11 9.89,16.67 10.17,16.42C7.95,16.17 5.62,15.31 5.62,11.5C5.62,10.39 6,9.5 6.65,8.79C6.55,8.54 6.2,7.5 6.75,6.15C6.75,6.15 7.59,5.88 9.5,7.17C10.29,6.95 11.15,6.84 12,6.84C12.85,6.84 13.71,6.95 14.5,7.17C16.41,5.88 17.25,6.15 17.25,6.15C17.8,7.5 17.45,8.54 17.35,8.79C18,9.5 18.38,10.39 18.38,11.5C18.38,15.32 16.04,16.16 13.81,16.41C14.17,16.72 14.5,17.33 14.5,18.26C14.5,19.6 14.5,20.68 14.5,21C14.5,21.27 14.66,21.59 15.17,21.5C19.14,20.16 22,16.42 22,12A10,10 0 0,0 12,2Z"
              />
            </svg>
          }
        />
      </ToolbarSection>
    </ToolbarRow>
  </Toolbar>
);

Header.contextTypes = {
  openDialog: PropTypes.func,
};

export default Header;
