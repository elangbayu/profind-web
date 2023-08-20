import { useEffect } from "react";
import Hero from "./components/Hero";
import Features from "./components/Features";
import Testimonials from "./components/Testimonials";
import Contact from "./components/Contact";
import { useTranslation } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

function getBrowserLocales(options = {}) {
  const defaultOptions = {
    languageCodeOnly: true,
  };

  const opt = {
    ...defaultOptions,

    ...options,
  };

  const browserLocales =
    navigator.languages === undefined
      ? [navigator.language]
      : navigator.languages;

  if (!browserLocales) {
    return undefined;
  }

  return browserLocales.map((locale) => {
    const trimmedLocale = locale.trim();

    return opt.languageCodeOnly ? trimmedLocale.split(/-|_/)[0] : trimmedLocale;
  });
}

const i18nextOptions = {
  order: [
    "localStorage",
    "querystring",
    "cookie",
    "sessionStorage",
    "navigator",
    "htmlTag",
  ],
  lookupQuerystring: "lng",
  lookupCookie: "i18next",
  lookupLocalStorage: "i18nextLng",
  lookupSessionStorage: "i18nextLng",

  // cache user language
  // caches: ["localStorage"],
  excludeCacheFor: ["cimode"],
  //cookieMinutes: 10,
  //cookieDomain: 'myDomain'
};

function App() {
  const { t, i18n } = useTranslation();

  useEffect(() => {
    localStorage.setItem("i18nextLng", getBrowserLocales()[0]);
    i18n.use(LanguageDetector).init({
      detection: i18nextOptions,
    });
  }, []);

  return (
    <>
      <Hero translate={t} />
      <Features translate={t} />
      <Testimonials translate={t} />
      <Contact translate={t} />
    </>
  );
}

export default App;
