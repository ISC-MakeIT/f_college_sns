export class InitializationService {
    public static async initialize() {
        try {
            this.detectPrivateMode(
                (isPrivate: any) => {
                    // tslint:disable-next-line:no-unused-expression
                    typeof isPrivate === 'undefined' ? 'cannot detect' : isPrivate ? 'private' : 'not private';
                },
            );

        // tslint:disable-next-line:no-empty
        } catch (e) { }
        return;
    }

    private static async detectPrivateMode(callback: any) {
        let isPrivate: any;

        if (window.webkitRequestFileSystem) {
            window.webkitRequestFileSystem(
                window.TEMPORARY, 1,
                () => {
                    isPrivate = false;
                },
                (e: any) => {
                    // tslint:disable-next-line:no-console
                    console.log(e);
                    isPrivate = true;
                },
            );
        } else if (window.indexedDB && /Firefox/.test(window.navigator.userAgent)) {
            let db: any;
            try {
                db = window.indexedDB.open('test');
            } catch (e) {
                isPrivate = true;
            }

            if (typeof isPrivate === 'undefined') {
                this.retry(
                    function isDone() {
                        return db.readyState === 'done' ? true : false;
                    },
                    function next(isTimeout: any) {
                        if (!isTimeout) {
                            isPrivate = db.result ? false : true;
                        }
                    },
                );
            }
        } else if (this.isIE10OrLater(window.navigator.userAgent)) {
            isPrivate = false;
            try {
                if (!window.indexedDB) {
                    isPrivate = true;
                }
            } catch (e) {
                isPrivate = true;
            }
        } else if (window.localStorage && /Safari/.test(window.navigator.userAgent)) {
            try {
                window.localStorage.setItem('test', '1');
            } catch (e) {
                isPrivate = true;
            }

            if (typeof isPrivate === 'undefined') {
                isPrivate = false;
                window.localStorage.removeItem('test');
            }
        }

        this.retry(
            function isDone() {
                return typeof isPrivate !== 'undefined' ? true : false;
            },
            function next(isTimeout: any) {
                callback(isPrivate);
            },
        );
    }

    private static async retry(isDone: any, next: any) {
        let currentTrial = 0;
        let isTimeout = false;
        const maxRetry = 50;
        const interval = 10;
        const id = window.setInterval(() => {
                    if (isDone()) {
                        window.clearInterval(id);
                        next(isTimeout);
                    }
                    if (currentTrial++ > maxRetry) {
                        window.clearInterval(id);
                        isTimeout = true;
                        next(isTimeout);
                    }
                },
                interval,
            );
    }

    private static async isIE10OrLater(userAgent: any) {
            const ua = userAgent.toLowerCase();
            if (ua.indexOf('msie') === 0 && ua.indexOf('trident') === 0) {
                return false;
            }
            const match = /(?:msie|rv:)\s?([\d\.]+)/.exec(ua);
            if (match && parseInt(match[1], 10) >= 10) {
                return true;
            }
            return false;
        }

}
