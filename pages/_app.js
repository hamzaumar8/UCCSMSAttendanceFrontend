import "../styles/globals.css";
import ProgressBar from "@badrap/bar-of-progress";
import { Router } from "next/router";
import { RecoilRoot } from "recoil";
import "react-toastify/dist/ReactToastify.css";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";

const progress = new ProgressBar({
    size: 3,
    color: "#59FFA0",
    className: "z-50",
    delay: 100,
});
Router.events.on("routeChangeStart", progress.start);
Router.events.on("routeChangeComplete", progress.finish);
Router.events.on("routeChangeError", progress.finish);

const App = ({ Component, pageProps }) => (
    <RecoilRoot>
        <Component {...pageProps} />
    </RecoilRoot>
);

export default App;
