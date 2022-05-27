// scroll bar
import 'simplebar/src/simplebar.css';
// highlight
import './utils/highlight';
// editor
import 'react-quill/dist/quill.snow.css';
// lazy image
import 'react-lazy-load-image-component/src/effects/blur.css';
import 'react-lazy-load-image-component/src/effects/opacity.css';
import 'react-lazy-load-image-component/src/effects/black-and-white.css';

// recoil root
import { RecoilRoot } from 'recoil';

// import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
// contexts
import { SettingsProvider } from './contexts/SettingsContext';
import { CollapseDrawerProvider } from './contexts/CollapseDrawerContext';
//
import App from './App';

// ----------------------------------------------------------------------

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
    <HelmetProvider>
      <SettingsProvider>
        <CollapseDrawerProvider>
          <RecoilRoot>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </RecoilRoot>
        </CollapseDrawerProvider>
      </SettingsProvider>
    </HelmetProvider>
);
