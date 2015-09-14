import {BsProgress} from '../../src/progress/progress';

describe('progress', () => {
    var progress;

    beforeEach(() => {
        progress = new BsProgress();
    });

    it('should calculate progress percent for default min = 0 / max = 100', () => {
        progress.value = 60;
        expect(progress.getPercentValue()).toBe(60);
    });
});
