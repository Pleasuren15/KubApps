import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue, } from "@/components/ui/select";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger, } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { usePods } from "@/contexts/PodContext";
import axios from "axios";
import { useState } from 'react';

const api = axios.create({
    baseURL: "https://localhost:7291/",
    headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
    },
});



function NavBar() {
    const [clusters, setCluster] = useState([{ subscription: '', clusters: [] }]);
    const { setPods, setSelectedCluster, setIsLoading } = usePods();

    const fetchClusters = async () => {
        try {
            await api.get("/getAllCluster")
                .then(res => {
                    const stagingClusters = res.data.filter((c: any) => c.name.includes('sta'));
                    const prClusters = res.data.filter((c: any) => c.name.includes('prod'));
                    const otherClusters = res.data.filter((c: any) => !c.name.includes('sta') && !c.name.includes('prod'));
                    const all = [{ subscription: 'staging', clusters: stagingClusters.map((c: any) => c.name) },
                    { subscription: 'production', clusters: prClusters.map((c: any) => c.name) },
                    { subscription: 'other', clusters: otherClusters.map((c: any) => c.name) }
                    ];
                    console.log(`clusters`, all);
                    setCluster(all);
                });
        }
        catch (error) {
            console.error("Error fetching clusters:", error);
        }
    };
    const fetchPods = async (cluster: any) => {
        try {
            setIsLoading(true);
            setSelectedCluster(cluster);
            await api.get(`/pods/${cluster}`)
                .then(res => {
                    console.log(`pods`, res.data);
                    setPods(res.data);
                });
        } catch (error) {
            console.error("Error fetching pods:", error);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <>
            <div className="navbar">
                <nav className="relative bg-white px-2 sm:px-4 lg:px-8">
                    <div className="mx-auto max-w-7xl">
                        <div className="relative flex h-14 sm:h-16 items-center justify-between flex-wrap gap-2 sm:gap-0">
                            <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
                                <Select onOpenChange={() => fetchClusters()} onValueChange={(value) => fetchPods(value)}>
                                    <SelectTrigger className="w-[280px] sm:w-[350px] transition-all duration-200 hover:shadow-md">
                                        <SelectValue placeholder="Select Your K8s Cluster" />
                                    </SelectTrigger>
                                    <SelectContent className="max-h-60 sm:max-h-80">
                                        {clusters.map((subscription) => (
                                            <SelectGroup key={subscription.subscription}>
                                                <SelectLabel className="font-semibold text-blue-600">{subscription.subscription.toUpperCase()}</SelectLabel>
                                                {subscription.clusters.map((cluster) => (
                                                    <SelectItem key={cluster} value={cluster} className="hover:bg-blue-50">
                                                        <span className="truncate">{cluster}</span>
                                                    </SelectItem>
                                                ))}
                                            </SelectGroup>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                                <Sheet>
                                    <SheetTrigger asChild>
                                        <Button variant="outline" size="icon" className="rounded-full">
                                            <img width="20" height="20" src="https://img.icons8.com/office/40/information.png" alt="information" />
                                        </Button>
                                    </SheetTrigger>
                                    <SheetContent>
                                        <SheetHeader>
                                            <SheetTitle>About</SheetTitle>
                                            <Separator />
                                            <SheetDescription>
                                                KubApps was developed by <strong>Pleasuren15</strong> as a personal project with the goal of continuously
                                                improving and refining development skills, particularly in the area of building modern,
                                                scalable web applications using contemporary frameworks, tools, and libraries.
                                                <br /><br />
                                                The project serves as both a learning platform and a practical solution, focusing on
                                                the management of Kubernetes clusters and the applications deployed within them. KubApps
                                                aims to simplify cluster administration, provide better visibility into deployed workloads,
                                                and offer a more streamlined way to interact with Kubernetes environments through a web-based interface.
                                            </SheetDescription>
                                        </SheetHeader>
                                        <SheetFooter>
                                            <SheetClose asChild>
                                                <Button variant="destructive">Close</Button>
                                            </SheetClose>
                                        </SheetFooter>
                                    </SheetContent>
                                </Sheet>
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
        </>
    );
}
export { NavBar }
