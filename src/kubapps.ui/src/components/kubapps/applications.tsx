import { Badge } from "@/components/ui/badge"
import { ButtonGroup } from "@/components/ui/button-group"
import { Button } from "@/components/ui/button"
import { HoverCard, HoverCardContent, HoverCardTrigger, } from "@/components/ui/hover-card"
import { Drawer, DrawerClose, DrawerContent, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger, } from "@/components/ui/drawer"
import { ScrollArea } from "@/components/ui/scroll-area"
import { usePods } from "@/contexts/PodContext";
import axios from "axios";
import { useState } from "react"

const api = axios.create({
    baseURL: "https://localhost:7291/"
});

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

function Application({ pod }: ApplicationProps) {
    return (
        <div className="border-1 border-solid border-cyan-500 p-2 text-gray-600">
            <p className="text-lg font-semibold text-gray-700 pb-2">{pod.name}</p>
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
                        <div className="flex justify-between">
                            <p className="text-l font-semibold flex justify-between">Labels</p>
                            <p className="text-l font-semibold flex justify-between">
                                <Badge className="mt-1 h-5 min-w-5 rounded-full px-1 font-mono tabular-nums" variant="outline">{pod.labels.length}+</Badge>
                            </p>
                        </div>
                    </HoverCardTrigger>
                    <HoverCardContent className="w-80 bg-blue-600">
                        <div className="flex justify-between gap-4">
                            <div className="space-y-1">
                                {pod.labels.map((label, index) => (
                                    <Badge key={index} className="mr-1" variant="secondary">{label}</Badge>
                                ))}
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
    const { pods, selectedCluster, paginatedPods, currentPage } = usePods();

    if (!selectedCluster) {
        return (
            <div className="mx-auto max-w-7xl mt-3 text-center text-gray-500">
                <p>Please select a cluster to view applications</p>
            </div>
        );
    }

    if (pods.length === 0) {
        return (
            <div className="mx-auto max-w-7xl mt-3 text-center text-gray-500">
                <p>No pods found in the selected cluster</p>
            </div>
        );
    }

    return (
        <div className="mx-auto max-w-7xl mt-3 min-h-[600px]">
            <div className="grid grid-cols-3 gap-4 transition-all duration-300 ease-in-out">
                {paginatedPods.map((pod, index) => (
                    <Application key={`${pod.name}-${currentPage}-${index}`} pod={pod} />
                ))}
            </div>
            {pods.length > 9 && (
                <div className="text-center text-sm text-gray-500 mt-4">
                    Showing {((currentPage - 1) * 9) + 1}-{Math.min(currentPage * 9, pods.length)} of {pods.length} pods
                </div>
            )}
        </div>
    )
}

export { Applications }
