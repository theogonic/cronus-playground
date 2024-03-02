
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, filter, from, switchMap, throwError } from "rxjs";
import {Pool, pool} from "./workerpool"


@Injectable({
    providedIn: "root"
})
export class GeneratorService {

    private pool: Pool;

    constructor() {
        const worker = new Worker(new URL('generator.worker', import.meta.url));
        this.pool = pool({ workerType:"web", webWorker: worker, maxWorkers: 1, minWorkers: 'max'});
        from(this.pool.exec("health"))
        .subscribe({
            next: (res) => console.log(res),
            error: err => console.error(err)
        })
    }

    generateApi(spec: string): Observable<string> {
        return from(this.pool.exec("generateApi", [spec]));
    }


}
