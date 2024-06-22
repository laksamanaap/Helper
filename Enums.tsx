// Helper A collection of icons and images
export enum Icons {
    EmailSuccess = '/images/icons/email_success_confirm.svg',
    EmailFail = '/images/icons/email_cancel.svg',
    // Add your icon or image here, or you can separate them
}

// Usage Example
import { Icons } from "@/utils/enums";
<SVGIcon src={Icons.EmailSuccess} width={80} height={80} className="mx-auto mb-5 text-primary" />

