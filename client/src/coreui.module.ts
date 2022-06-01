import {NgModule} from '@angular/core';
import {
    AvatarModule,
    BadgeModule,
    BreadcrumbModule,
    ButtonGroupModule,
    ButtonModule,
    CardModule,
    DropdownModule,
    FooterModule,
    FormModule,
    GridModule,
    HeaderModule,
    ListGroupModule,
    NavModule,
    ProgressModule,
    SharedModule,
    SidebarModule,
    TabsModule,
    UtilitiesModule,
} from '@coreui/angular';
@NgModule({
    exports: [
        AvatarModule,
        BadgeModule,
        BreadcrumbModule,
        ButtonGroupModule,
        ButtonModule,
        CardModule,
        DropdownModule,
        FooterModule,
        FormModule,
        GridModule,
        HeaderModule,
        ListGroupModule,
        NavModule,
        ProgressModule,
        SharedModule,
        SidebarModule,
        TabsModule,
        UtilitiesModule,
    ]
})
export class CoreUIModule {}