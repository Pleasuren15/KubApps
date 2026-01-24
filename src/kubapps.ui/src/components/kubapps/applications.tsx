import { Badge } from "@/components/ui/badge"
import { ButtonGroup } from "@/components/ui/button-group"
import { Button } from "@/components/ui/button"
import { HoverCard, HoverCardContent, HoverCardTrigger, } from "@/components/ui/hover-card"
import { Drawer, DrawerClose, DrawerContent, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger, } from "@/components/ui/drawer"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Skeleton } from "@/components/ui/skeleton"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { usePods } from "@/contexts/PodContext";
import { useState } from "react";
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

async function getPodLogs(clusterName: string, namespace: string, podName: string) {
    try {
        const response = await axios.get(`https://localhost:7291/pods/${clusterName}/namespaces/${namespace}/pods/${podName}/logs`);
        return response.data;
    } catch (error) {
        console.error("Error fetching pod logs:", error);
        throw error;
    }
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
    const [logs, setLogs] = useState<string | null>(null);
    const [isLoadingLogs, setIsLoadingLogs] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const { selectedCluster } = usePods();

    const handleGetLogs = async () => {
        if (!selectedCluster || isLoadingLogs) {
            return;
        }
        
        setIsLoadingLogs(true);
        try {
            const podLogs = await getPodLogs(selectedCluster, pod.namespace, pod.name);
            setLogs(podLogs || 'No logs available');
        } catch (error) {
            console.error('Failed to fetch pod logs:', error);
            setLogs('Error: Failed to fetch logs. Please try again.');
        } finally {
            setIsLoadingLogs(false);
        }
    };

    const handleDrawerOpenChange = (open: boolean) => {
        setIsOpen(open);
        if (open && !logs && !isLoadingLogs) {
            handleGetLogs();
        }
    };

    return (
        <div className="border-1 border-solid border-cyan-500 p-2 sm:p-3 text-gray-600 bg-white shadow-sm hover:shadow-md transition-all duration-200 hover:scale-[1.02] w-full">
            <p className="text-sm sm:text-lg font-semibold text-gray-700 pb-2" title={pod.name}>{pod.name.length > (window.innerWidth < 640 ? 25 : 40) ? pod.name.substring(0, window.innerWidth < 640 ? 25 : 40) + "..." : pod.name}</p>
            <hr className="border-cyan-500" />
            <p className="text-xs sm:text-l font-semibold flex justify-between pt-2"><span>Namespace</span><span className="truncate ml-2">{pod.namespace}</span></p>
            <p className="text-xs sm:text-l font-semibold flex justify-between"><span>Status</span><span className="truncate ml-2">{pod.status}</span></p>
            <p className="text-xs sm:text-l font-semibold flex justify-between"><span>ControllerBy</span><span className="truncate ml-2">{pod.controlledBy}</span></p>
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
                    <Drawer open={isOpen} onOpenChange={handleDrawerOpenChange}>
                        <DrawerTrigger asChild>
                            <Button 
                                disabled={!selectedCluster}
                                className="flex-1 cursor-pointer text-left" 
                                variant="outline"
                                onClick={handleGetLogs}
                            >
                                View Logs
                            </Button>
                        </DrawerTrigger>

                        <DrawerContent>
                            <div className="w-full px-4">
                                <DrawerHeader className="mx-auto w-3/4 text-left px-0">
                                    <DrawerTitle className="text-left">Pod Logs: {pod.name}</DrawerTitle>
                                </DrawerHeader>
                                <ScrollArea className="mx-auto w-3/4 rounded-md border h-96">
                                    <div className="p-4 min-h-full">
                                        {isLoadingLogs ? (
                                            <div className="flex items-center justify-center h-32">
                                                <div className="text-sm text-gray-500">Loading logs...</div>
                                            </div>
                                        ) : logs !== null ? (
                                            <div className="w-full">
                                                <pre className="text-xs font-mono whitespace-pre-wrap break-words text-gray-800 leading-relaxed">
                                                    {logs}
                                                </pre>
                                            </div>
                                        ) : (
                                            <div className="text-sm text-gray-500 text-center py-8">
                                                Open drawer to fetch pod logs
                                            </div>
                                        )}
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
    const { pods, selectedCluster, paginatedPods, currentPage, isLoading, searchTerm, setSearchTerm, filteredPods, selectedNamespace, setSelectedNamespace, availableNamespaces } = usePods();

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

    const getFilterDescription = () => {
        let description = `Total: ${pods.length} pods`;
        const hasFilters = searchTerm || selectedNamespace !== 'all';
        
        if (hasFilters) {
            description = `Showing ${filteredPods.length} of ${pods.length} pods`;
            const filters = [];
            if (selectedNamespace !== 'all') filters.push(`namespace: ${selectedNamespace}`);
            if (searchTerm) filters.push('search filter');
            description += ` (${filters.join(', ')})`;
        }
        
        return description;
    };

    return (
        <div className="mx-auto max-w-7xl mt-3 min-h-[400px] sm:min-h-[500px] lg:min-h-[600px] px-2 sm:px-4">
            <div className="mb-4">
                <div className="flex flex-col gap-4 items-start justify-between mb-4">
                    <div>
                        <h2 className="text-lg sm:text-xl font-semibold text-gray-800">Cluster: <span className="text-blue-600">{selectedCluster}</span></h2>
                        <p className="text-xs sm:text-sm text-gray-600">
                            {getFilterDescription()}
                        </p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3 w-full">
                        <Input
                            type="text"
                            placeholder="Search pods by name, namespace, status, or labels..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="flex-1 transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        <Select value={selectedNamespace} onValueChange={setSelectedNamespace}>
                            <SelectTrigger className="w-full sm:w-48 transition-all duration-200 hover:shadow-md">
                                <SelectValue placeholder="All Namespaces" />
                            </SelectTrigger>
                            <SelectContent className="max-h-60">
                                <SelectItem value="all">
                                    <span className="font-medium">All Namespaces</span>
                                    <span className="text-xs text-gray-500 ml-2">({pods.length})</span>
                                </SelectItem>
                                {availableNamespaces.map((namespace) => {
                                    const count = pods.filter(pod => pod.namespace === namespace).length;
                                    return (
                                        <SelectItem key={namespace} value={namespace}>
                                            <span>{namespace}</span>
                                            <span className="text-xs text-gray-500 ml-2">({count})</span>
                                        </SelectItem>
                                    );
                                })}
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </div>
            
            {filteredPods.length === 0 && (searchTerm || selectedNamespace !== 'all') ? (
                <div className="text-center text-gray-500 py-12">
                    <div className="mb-4">
                        <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                    <p className="text-lg font-medium mb-2">No pods found</p>
                    <p className="text-sm mb-4">
                        No pods match your current filters
                        {searchTerm && ` for "${searchTerm}"`}
                        {selectedNamespace !== 'all' && ` in namespace "${selectedNamespace}"`}
                    </p>
                    <div className="flex gap-2 justify-center">
                        {searchTerm && (
                            <Button 
                                variant="outline" 
                                size="sm" 
                                onClick={() => setSearchTerm('')}
                            >
                                Clear search
                            </Button>
                        )}
                        {selectedNamespace !== 'all' && (
                            <Button 
                                variant="outline" 
                                size="sm" 
                                onClick={() => setSelectedNamespace('all')}
                            >
                                Show all namespaces
                            </Button>
                        )}
                    </div>
                </div>
            ) : (
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-3 sm:gap-4 transition-all duration-300 ease-in-out auto-rows-max">
                        {paginatedPods.map((pod, index) => (
                            <Application key={`${pod.name}-${currentPage}-${index}`} pod={pod} />
                        ))}
                    </div>
                    {filteredPods.length > 9 && (
                        <div className="text-center text-xs sm:text-sm text-gray-500 mt-4 sm:mt-6 p-3 sm:p-4 bg-gray-50 rounded-lg">
                            Showing {((currentPage - 1) * 9) + 1}-{Math.min(currentPage * 9, filteredPods.length)} of {filteredPods.length} {(searchTerm || selectedNamespace !== 'all') ? 'filtered ' : ''}pods
                        </div>
                    )}
                </>
            )}
        </div>
    )
}

export { Applications }
