export class InitializationService {
    public static async initialize() {
        try {
            this.isPrivateMode().then((isPrivate) => {
                console.log('Is in private mode: ', isPrivate);
            });
        // tslint:disable-next-line:no-empty
        } catch (e) { }
        return;
    }

    private static async isPrivateMode() {
        return new Promise(resolve => {
            const on = () => resolve(true); // is in private mode
            const off = () => resolve(false); // not private mode
            const testLocalStorage = () => {
                try {
                    if (localStorage.length) off();
                    else {
                        localStorage.x = 1;
                        localStorage.removeItem('x');
                        off();
                    }
                } catch (e) {
                    // Safari only enables cookie in private mode
                    // if cookie is disabled then all client side storage is disabled
                    // if all client side storage is disabled, then there is no point
                    // in using private mode
                    navigator.cookieEnabled ? on() : off();
                }
            };
            // Chrome & Opera
            if (window.webkitRequestFileSystem) {
                return void window.webkitRequestFileSystem(0, 0, off, on);
            }
            // Firefox
            if ('MozAppearance' in document.documentElement.style) {
                const db = indexedDB.open('test');
                db.onerror = on;
                db.onsuccess = off;
                return void 0;
            }
            // Safari
            if (/constructor/i.test(window.HTMLElement)) {
                return testLocalStorage();
            }
            // IE10+ & Edge
            if (!window.indexedDB && (window.PointerEvent || window.MSPointerEvent)) {
                return on();
            }
            // others
            return off();
        });
    }

}
