import * as React from "react";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

const clusters = [
    {
        subscription: "sub-prod-platform",
        clusters: [
            "aks-prod-euw-0",
            "aks-nonprod-weu-01",
            "aks-prod-southafricanorth-01",
        ],
    },
    {
        subscription: "sub-payments-nonprod",
        clusters: [
            "aks-platform-prod",
            "aks-observability-prod",
            "aks-shared-services",
            "aks-payments-prod",
        ],
    },
];

function NavBar() {
    return (
        <>
            <div className="navbar">
                <nav className="relative border-b border-gray-200 bg-white px-4 sm:px-6 lg:px-8">
                    <div className="mx-auto max-w-7xl">
                        <div className="relative flex h-16 items-center justify-between">
                            <div>
                                <Select>
                                    <SelectTrigger className="w-[350px]">
                                        <SelectValue placeholder="Select A Cluster" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {clusters.map((subscription) => (
                                            <SelectGroup key={subscription.subscription}>
                                                <SelectLabel>{subscription.subscription}</SelectLabel>
                                                {subscription.clusters.map((cluster) => (
                                                    <SelectItem key={cluster} value={cluster}>
                                                        {cluster}
                                                    </SelectItem>
                                                ))}
                                            </SelectGroup>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                                asdlkonahodi
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
        </>
    );
}

export { NavBar };
