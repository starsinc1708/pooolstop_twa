<template>
    <UIModal class="ui-terms" :padding="0" :center="true" @close="onClose">
        <div class="ui-terms__content">
            <h2 class="ui-terms__title">Terms of Service</h2>

            <div class="ui-terms__info">
                <UITermsContent
                    v-for="element in getContent"
                    :key="element.id"
                    :title="element.title"
                    :label="element.label"
                />
            </div>
        </div>
    </UIModal>
</template>

<script>
import UIModal from "@/components/ui/modal/modal.vue";
import UITermsContent from "@/components/ui/terms/content.vue";

import {MODALS} from "@/store/modal.js";

export default {
    name: "UITerms",
    components: {
        UIModal,
        UITermsContent,
    },
    computed: {
        getContent() {
            return [
                {
                    id: 0,
                    title: "",
                    label: "Poools.top is a corporation incorporated in the state of Delaware, USA, and provides products, services, and technologies through the (“Poools.top Platform”). These terms of service constitute the entire agreement between the parties (together, the “Terms”). In the event of any inconsistency between these Terms and any of the other addenda, terms, and documents, the provisions of these terms of services shall prevail to the extent of such inconsistency. All other information provided on the Poools.top Platform or oral/written statements made are excluded from these Terms and do not constitute a legal agreement between the parties. Use of the Luxor Platform and the services is governed by these Terms.",
                },
                {
                    id: 1,
                    title: "Updating our Terms",
                    label: "We work constantly to improve our services, products, and software by expanding our offering, developing new features, or partnering with other industry peers. As a result, we may need to update these Terms to reflect the updates. By accessing, viewing, submitting, or downloading information from the Poools.top Platform and using the services provided by Poools.top, you acknowledge that you have read and considered, and you understand and unconditionally agree to be bound by these Terms. Poools.top may, at any time, without notice, amend the Terms. You agree to continue to be bound by any such amended Terms and that Luxor has no obligation to notify you of such amendments. You acknowledge that it is your responsibility to check these Terms periodically for changes and that your continued use of the Luxor Platform and services offered by Poools.top following the posting of any changes to the Terms indicates your acceptance of any such changes.",
                },
                {
                    id: 2,
                    title: "AML / KYC policy",
                    label: `This Know-your-Customer and Anti-money Laundering Policy ("KYC/AML Policy") outlines the procedures and mechanisms used by Luxor to prevent money laundering and doing business with illicit counterparties. Our KYC/AML Policy is guided by the BSA, specifically, the AML and Counter-Terrorist Financing (“CTF”) provisions, as mandated by U.S. federal law, the Patriot Act, and all other rules and regulations regarding KYC, AML, and CTF. You are not allowed to access or use the Luxor Platform if any part of your mining farm is located in, you are located in, incorporated or otherwise established in, or a resident of: (i) any state, country or other jurisdiction that is embargoed by the United States of America; (ii) a jurisdiction where it would be illegal according to Applicable Law for you (by reason of your nationality, domicile, citizenship, residence or otherwise) to access or use the Luxor Platform; or (iii) where the publication or availability of the Luxor Platform is prohibited or contrary to local law or regulation, or could subject any member of Luxor to any local registration or licensing requirements (together, the “Restricted Jurisdictions”). Luxor may, in its sole discretion, implement controls to restrict access to the Luxor Platform in any of the Restricted Jurisdictions. If Luxor determines that you are accessing the Luxor Platform from any Restricted Jurisdiction, or have given false representations as to your location of incorporation, establishment, citizenship or place of residence, Luxor reserves the right to close any of your accounts immediately and freeze all of your account balances. You hereby authorize us, or a third-party service provider, to take any measures that we consider necessary to perform background checks on yourself and/or your institution. We screen individuals and institutions that are illicit actors, politically exposed, sanctioned, and/or have adverse media outstanding. Failing to comply with KYC/AML policies and background checks provides Luxor the right to close any of your accounts and/or freeze all of your account balances.`,
                },
            ];
        },
    },
    methods: {
        onClose() {
            this.$store.commit("modal/setModal", MODALS.default);
        },
    },
};
</script>

<style lang="scss">
.ui-terms {
    .ui-terms__content {
        @include scrollbar-x;
        width: 990px;
        max-height: 680px;
        overflow-y: auto;
        padding: 48px 60px;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .ui-terms__title {
        font-size: 28px;
        line-height: 34px;
        text-align: center;
        color: $txt-main;
        margin-bottom: 36px;
    }

    .ui-terms__info {
        display: flex;
        flex-direction: column;
        grid-row-gap: 32px;
    }
}

@media screen and (max-width: 1024px) {
    .ui-terms {
        .ui-terms__content {
            width: 640px;
        }
    }
}

@media screen and (max-width: 768px) {
    .ui-terms {
        .ui-terms__content {
            width: 100%;
            padding: 32px 18px 24px 18px;
        }

        .ui-terms__title {
            font-size: 24px;
            line-height: 29px;
            margin-bottom: 24px;
        }

        .ui-terms__info {
            grid-row-gap: 24px;
        }
    }
}
</style>
