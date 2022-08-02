import { AbstractController } from "../util/rest/controller";
declare class HealthController extends AbstractController {
    constructor();
    protected initializeRoutes(): void;
    private healthResponse;
}
export default HealthController;
