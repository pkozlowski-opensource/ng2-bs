import {BsProgress} from '../../src/progress/progress';

describe('progress', () => {
    var progress;

    beforeEach(() => {
        progress = new BsProgress();
    });

    it('should calculate progress percent', () => {
        progress.value = 60;
        expect(progress.getPercentValue()).toBe(60);
    });
});