import 'mocha';
import {expect} from 'chai';
import * as Sinon from 'sinon';
import {DelayedTask} from '../src/DelayedTask';

describe('DelayedTask', () => {
    const ms:number = 10;

    var func:Sinon.SinonStub;
    var delayedTask:DelayedTask;

    beforeEach(() => {
        func = Sinon.stub();
        delayedTask = new DelayedTask(func, ms);
    });

    it('should not begin delay on construction', () => {
        expect(func.called).to.equal(false);

        return new Promise(resolve => {
            setTimeout(_ => {
                expect(func.called).to.equal(false);
                resolve();
            }, ms + 10);
        });
    });

    it('should delay running function', () => {
        delayedTask.delay();

        expect(func.called).to.equal(false);

        return new Promise(resolve => {
            setTimeout(_ => {
                expect(func.called).to.equal(true);
                resolve();
            }, ms + 10);
        });
    });

    it('should reset delay of running function', () => {
        delayedTask.delay();

        expect(func.called).to.equal(false);

        setTimeout(_ => {
            expect(func.called).to.equal(false);
            delayedTask.delay();
        }, ms / 2);

        return new Promise(resolve => {
            setTimeout(_ => {
                expect(func.called).to.equal(true);
                delayedTask.delay();
                resolve();
            }, ms + ms / 2 + 10);
        });
    });

    it('should cancel ruunning function', () => {
        delayedTask.delay();
        delayedTask.cancel();

        expect(func.called).to.equal(false);

        return new Promise(resolve => {
            setTimeout(_ => {
                expect(func.called).to.equal(false);
                resolve();
            }, ms + 10);
        });
    });

    it('should run function immediatly', () => {
        delayedTask.delay();
        delayedTask.run();

        expect(func.called).to.equal(true);

        return new Promise(resolve => {
            setTimeout(_ => {
                expect(func.calledOnce).to.equal(true);
                resolve();
            }, ms + 10);
        });
    });
});
