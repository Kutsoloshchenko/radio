// Export component that has its own selector to be easier imported to other modules

import { Component } from "@angular/core";

@Component({
    selector: "main-view",
    templateUrl: "main_view.component.html",
    styleUrls: ["./main_view.component.css"]
})
export class MainViewComponent {
    
}