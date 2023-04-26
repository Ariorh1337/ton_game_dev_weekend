import Event from "util/Event";
import { init_dictionary } from "util/i18n";
import LoadManager from "util/loader";
import MyWorker from "worker-loader?filename=engine.js!../engine";

export const EngineWorker = MyWorker;

export const FPS = 10;

// Uncomment in case of using assets with dynamic size (svg)
export const SCALE = 1; // (window.innerHeight / 667) * devicePixelRatio;
export const WIDTH = 854; // 375 * SCALE;
export const HEIGHT = 1390; // 667 * SCALE;

export const X = (rel: number) => WIDTH * rel;
export const Y = (rel: number) => HEIGHT * rel;

export const event = new Event();
export const loader = new LoadManager();

let language: Record<string, string> = {};
export function i18n(key: string, replacer?: string) {
    const value = language[key];

    if (!value) return key;
    if (!replacer) return value;

    return value.replaceAll("{{X}}", replacer);
}

export const setLanguage = async (code: string) => {
    if (Object.keys(language).length) return Promise.resolve(false);

    language = await init_dictionary(code, `${LoadManager.path}/i18n.csv`);

    return Promise.resolve(true);
};
