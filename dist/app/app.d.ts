/// <reference types="node" />
import { EventEmitter } from "events";
import express from "express";
import { Controller } from "./util/rest/controller";
declare class App extends EventEmitter {
    app: express.Application;
    constructor(controllers: Controller[]);
    listen(): void;
    getServer(): express.Application;
    private initializeMiddlewares;
    private initializeControllers;
}
export default App;
