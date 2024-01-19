import {describe, expect, test, jest} from '@jest/globals';

import {main} from "./lambda";


test('get all', ()=>{
    return main().then(data =>{
        expect(data.body).toBe("Peanut butter")
    })
})