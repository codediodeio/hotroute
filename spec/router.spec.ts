import 'intersection-observer';
import 'jest';
import hotroute from '../src';
import { Router } from '../src/router';

describe('State', () => {
    let router;
    beforeAll(() => {
        router = hotroute( { log: true, prefetch: false });
    })

    test('startHotRoute should return an instance of Router', () => {
        expect(router).toBeInstanceOf(Router);
    });

})


