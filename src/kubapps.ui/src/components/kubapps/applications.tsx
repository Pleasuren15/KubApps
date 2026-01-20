import { Badge } from "@/components/ui/badge"
import { ButtonGroup } from "@/components/ui/button-group"
import { Button } from "@/components/ui/button"
import { HoverCard, HoverCardContent, HoverCardTrigger, } from "@/components/ui/hover-card"
import { Drawer, DrawerClose, DrawerContent, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger, } from "@/components/ui/drawer"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Skeleton } from "@/components/ui/skeleton"
import { usePods } from "@/contexts/PodContext";
import axios from "axios";

interface Pod {
    name: string;
    namespace: string;
    status: string;
    controlledBy: string;
    isReady: boolean;
    labels: string[];
    dateTimeCreated: string;
}

interface ApplicationProps {
    pod: Pod;
}

function SkeletonCard() {
    return (
        <div className="border-1 border-solid border-gray-200 p-2 text-gray-600 bg-white shadow-sm hover:shadow-md transition-shadow duration-200">
            <Skeleton className="h-6 w-3/4 mb-2" />
            <Skeleton className="h-px w-full mb-2" />
            <div className="space-y-2">
                <div className="flex justify-between items-center">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-4 w-16" />
                </div>
                <div className="flex justify-between items-center">
                    <Skeleton className="h-4 w-16" />
                    <Skeleton className="h-4 w-20" />
                </div>
                <div className="flex justify-between items-center">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-4 w-18" />
                </div>
                <div className="flex justify-between items-center">
                    <Skeleton className="h-4 w-14" />
                    <Skeleton className="h-5 w-16 rounded-full" />
                </div>
                <div className="flex justify-between items-center">
                    <Skeleton className="h-4 w-12" />
                    <Skeleton className="h-5 w-8 rounded-full" />
                </div>
            </div>
            <div className="mt-4 space-y-2">
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-8 w-full" />
            </div>
        </div>
    );
}

function Application({ pod }: ApplicationProps) {
    return (
        <div className="border-1 border-solid border-cyan-500 p-2 text-gray-600 bg-white shadow-sm hover:shadow-md transition-all duration-200 hover:scale-[1.02]">
            <p className="text-lg font-semibold text-gray-700 pb-2" title={pod.name}>{pod.name.length > 40 ? pod.name.substring(0,40) + "..." : pod.name}</p>
            <hr className="border-cyan-500" />
            <p className="text-l font-semibold flex justify-between pt-2"><span>Namespace</span><span>{pod.namespace}</span></p>
            <p className="text-l font-semibold flex justify-between"><span>Status</span><span>{pod.status}</span></p>
            <p className="text-l font-semibold flex justify-between"><span>ControllerBy</span><span>{pod.controlledBy}</span></p>
            <p className="text-l font-semibold flex justify-between">
                <span>Health</span>
                <span>{pod.isReady ? <Badge className="bg-green-400">Healthy</Badge> : <Badge className="bg-red-500">Unhealthy</Badge>}</span>
            </p>
            <div>
                <HoverCard>
                    <HoverCardTrigger asChild>
                        <div className="flex justify-between cursor-pointer hover:bg-gray-50 p-1 rounded transition-colors">
                            <p className="text-l font-semibold flex justify-between">Labels</p>
                            <p className="text-l font-semibold flex justify-between">
                                <Badge className="mt-1 h-5 min-w-5 rounded-full px-1 font-mono tabular-nums" variant="outline">{pod.labels.length}+</Badge>
                            </p>
                        </div>
                    </HoverCardTrigger>
                    <HoverCardContent className="w-80 bg-blue-600 max-h-60 overflow-y-auto">
                        <div className="flex justify-between gap-4">
                            <div className="space-y-1 flex-wrap">
                                {pod.labels.length > 0 ? (
                                    pod.labels.map((label, index) => (
                                        <Badge key={index} className="mr-1 mb-1" variant="secondary">{label}</Badge>
                                    ))
                                ) : (
                                    <Badge variant="secondary">No labels</Badge>
                                )}
                            </div>
                        </div>
                    </HoverCardContent>
                </HoverCard>
            </div>
            <div className="mt-2">
                <ButtonGroup className="w-full flex">
                    <Drawer>
                        <DrawerTrigger asChild>
                            <Button className="flex-1 cursor-pointer text-left" variant="outline">
                                View Logs
                            </Button>
                        </DrawerTrigger>

                        <DrawerContent>
                            <div className="w-full px-4">
                                <DrawerHeader className="mx-auto w-3/4 text-left px-0">
                                    <DrawerTitle className="text-left">Pod Logs: {pod.name}</DrawerTitle>
                                </DrawerHeader>
                                <ScrollArea className="mx-auto w-3/4 rounded-md border">
                                    <div className="p-4">
                                        <h4 className="text-sm leading-none font-medium">Connected to database</h4>
                                        <h4 className="text-sm leading-none font-medium">Connected to database</h4>
                                        <h4 className="text-sm leading-none font-medium">Request received: GET /health</h4>
                                        <h4 className="text-sm leading-none font-medium">Starting server on port 8080</h4>
                                        <h4 className="text-sm leading-none font-medium">Request received: GET /health</h4>
                                    </div>
                                </ScrollArea>
                                <DrawerFooter className="mx-auto w-3/4 flex justify-start px-0">
                                    <DrawerClose asChild>
                                        <Button variant="destructive" size="sm" className="cursor-pointer w-fit px-4">Close Logs</Button>
                                    </DrawerClose>
                                </DrawerFooter>
                            </div>
                        </DrawerContent>
                    </Drawer>
                    <Button className="flex-1 cursor-pointer bg-blue-600 hover:bg-blue-700">
                        Forward Pod
                    </Button>
                </ButtonGroup>
            </div>
        </div>
    )
}

function Applications() {
    const { pods, selectedCluster, paginatedPods, currentPage, isLoading } = usePods();

    if (!selectedCluster) {
        return (
            <div className="mx-auto max-w-7xl mt-3 text-center text-gray-500">
                <div className="p-8">
                    <p className="text-lg">Please select a cluster to view applications</p>
                    <p className="text-sm mt-2">Choose a Kubernetes cluster from the dropdown above to see its pods</p>
                </div>
            </div>
        );
    }

    if (isLoading) {
        return (
            <div className="mx-auto max-w-7xl mt-3 min-h-[600px]">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 transition-all duration-300 ease-in-out">
                    {Array.from({ length: 9 }).map((_, index) => (
                        <SkeletonCard key={`skeleton-${index}`} />
                    ))}
                </div>
                <div className="text-center text-sm text-gray-500 mt-4">
                    <div className="flex items-center justify-center gap-2">
                        <Skeleton className="h-4 w-4 rounded-full animate-pulse" />
                        Loading pods from {selectedCluster}...
                    </div>
                </div>
            </div>
        );
    }

    if (pods.length === 0) {
        return (
            <div className="mx-auto max-w-7xl mt-3 text-center text-gray-500">
                <div className="p-8">
                    <p className="text-lg">No pods found in the selected cluster</p>
                    <p className="text-sm mt-2">The cluster <strong>{selectedCluster}</strong> appears to be empty or the pods are not accessible</p>
                </div>
            </div>
        );
    }

    return (
        <div className="mx-auto max-w-7xl mt-3 min-h-[600px] px-4">
            <div className="mb-4">
                <h2 className="text-xl font-semibold text-gray-800">Cluster: <span className="text-blue-600">{selectedCluster}</span></h2>
                <p className="text-sm text-gray-600">Total pods: {pods.length}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 transition-all duration-300 ease-in-out auto-rows-max">
                {paginatedPods.map((pod, index) => (
                    <Application key={`${pod.name}-${currentPage}-${index}`} pod={pod} />
                ))}
            </div>
            {pods.length > 9 && (
                <div className="text-center text-sm text-gray-500 mt-6 p-4 bg-gray-50 rounded-lg">
                    Showing {((currentPage - 1) * 9) + 1}-{Math.min(currentPage * 9, pods.length)} of {pods.length} pods
                </div>
            )}
        </div>
    )
}

export { Applications }
