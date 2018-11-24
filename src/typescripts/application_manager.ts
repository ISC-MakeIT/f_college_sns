import { ProductLowerType } from './entities';

interface VoteIdsType { 'fashion': number[]; 'beauty': number[]; }

export class ApplicationManager {

    public static get instance(): ApplicationManager {

        if (!this._instance) {
            const voteIds = this.getVoteIds();
            const remainedVoteCount = this.getRemainedVoteCount();
            const activeCategory = this.getActiveCategory();
            this._instance = new ApplicationManager(voteIds, remainedVoteCount, activeCategory);
        }

        return this._instance;
    }

    public static BEAUTY_VOTE_COUNT = 3;
    public static FASHION_VOTE_COUNT = 3;

    // Storage keyを定数に
    public static KEY_PREFIX = 'PROD';
    private static KEY_VOTE_IDS = `${ApplicationManager.KEY_PREFIX}_voteIds`;
    private static KEY_REMAINED_VOTE_COUNT = `${ApplicationManager.KEY_PREFIX}_remainedVoteCount`;
    private static KEY_ACTIVE_CATEGORY = `${ApplicationManager.KEY_PREFIX}_activeCategory`;

    // tslint:disable-next-line:variable-name
    private static _instance: ApplicationManager;

    private static getVoteIds = () => {
        const voteIds: any = localStorage.getItem(ApplicationManager.KEY_VOTE_IDS);

        if (!voteIds) {
            const initialVoteIds = { fashion: [], beauty: [] };
            localStorage.setItem(ApplicationManager.KEY_VOTE_IDS, JSON.stringify(initialVoteIds));
            return initialVoteIds;
        }

        return JSON.parse(voteIds);
    }

    private static getRemainedVoteCount = () => {
        let remainedVoteCount: any = localStorage.getItem(ApplicationManager.KEY_REMAINED_VOTE_COUNT);

        if (!remainedVoteCount) {
            remainedVoteCount = {};
            remainedVoteCount.fashion = ApplicationManager.FASHION_VOTE_COUNT;
            remainedVoteCount.beauty = ApplicationManager.BEAUTY_VOTE_COUNT;
            localStorage.setItem(ApplicationManager.KEY_REMAINED_VOTE_COUNT, JSON.stringify(remainedVoteCount));
            return remainedVoteCount;
        }

        return JSON.parse(remainedVoteCount);
    }

    private static getActiveCategory = () => {
        let activeCategory: any = localStorage.getItem(ApplicationManager.KEY_ACTIVE_CATEGORY);

        if (!activeCategory) {
            activeCategory = 'fashion';
            localStorage.setItem(ApplicationManager.KEY_ACTIVE_CATEGORY, JSON.stringify(activeCategory));
            return activeCategory;
        }

        return JSON.parse(activeCategory);
    }

    public voteIds: VoteIdsType;
    public remainedVoteCount: { fashion: number, beauty: number };
    public activeCategory: ProductLowerType;

    private constructor(voteIds: VoteIdsType, remainedVoteCount: { fashion: number, beauty: number }, activeCategory: ProductLowerType) {
        this.voteIds = voteIds;
        this.remainedVoteCount = remainedVoteCount;
        this.activeCategory = activeCategory;
    }

    public changeActiveCategory(category: ProductLowerType) {
        this.activeCategory = category;
        localStorage.setItem(ApplicationManager.KEY_ACTIVE_CATEGORY, JSON.stringify(this.activeCategory));
    }

    public pushVoteIds = async (id: number, key: ProductLowerType) => {
        const tmpStorageIds = localStorage.getItem(ApplicationManager.KEY_VOTE_IDS) || '"{}"';
        const parsedTmpStorageIds = JSON.parse(tmpStorageIds);

        if (parsedTmpStorageIds[key].includes(id)) return;

        parsedTmpStorageIds[key.toLowerCase()].push(id);
        this.voteIds = parsedTmpStorageIds;
        localStorage.setItem(ApplicationManager.KEY_VOTE_IDS, JSON.stringify(this.voteIds));
        await this.decrementRemainedVoteCount(key);
    }

    public popVoteIds = async (id: number, key: ProductLowerType) => {
        const tmpStorageIds = localStorage.getItem(ApplicationManager.KEY_VOTE_IDS) || '"{}"';
        const parsedTmpStorageIds = JSON.parse(tmpStorageIds);
        parsedTmpStorageIds[key] = parsedTmpStorageIds[key.toLowerCase()].filter((e: number) => e !== id);
        this.voteIds = parsedTmpStorageIds;
        localStorage.setItem(ApplicationManager.KEY_VOTE_IDS, JSON.stringify(this.voteIds));
        await this.incrementRemainedVoteCount(key);
    }

    public async incrementRemainedVoteCount(key: ProductLowerType) {
        const tmpRemainedVoteCount = await localStorage.getItem(ApplicationManager.KEY_REMAINED_VOTE_COUNT);
        if (!tmpRemainedVoteCount) return;

        const parsedStorageVoteCount = JSON.parse(tmpRemainedVoteCount);
        parsedStorageVoteCount[key] += 1;
        this.remainedVoteCount = parsedStorageVoteCount;
        await localStorage.setItem(ApplicationManager.KEY_REMAINED_VOTE_COUNT, JSON.stringify(this.remainedVoteCount));
    }

    public async decrementRemainedVoteCount(key: ProductLowerType) {
        const tmpRemainedVoteCount = localStorage.getItem(ApplicationManager.KEY_REMAINED_VOTE_COUNT);
        if (!tmpRemainedVoteCount) return;

        const parsedStorageVoteCount = JSON.parse(tmpRemainedVoteCount);
        parsedStorageVoteCount[key] -= 1;
        this.remainedVoteCount = parsedStorageVoteCount;
        await localStorage.setItem(ApplicationManager.KEY_REMAINED_VOTE_COUNT, JSON.stringify(this.remainedVoteCount));
    }
}
