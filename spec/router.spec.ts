import 'jest';
import { startHotRoute, Router } from '../src';

describe('State', () => {
    let router;
    beforeAll(() => {
        router = startHotRoute( { log: true });
    })

    test('startHotRoute should return an instance of Router', () => {
        expect(router).toBeInstanceOf(Router);
    });

})


