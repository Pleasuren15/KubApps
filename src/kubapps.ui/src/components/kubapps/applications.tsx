import { Accordion, AccordionContent, AccordionItem, AccordionTrigger, } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@radix-ui/react-select"
import { ButtonGroup } from "@/components/ui/button-group"
import { Button } from "@/components/ui/button"
import { HoverCard, HoverCardContent, HoverCardTrigger, } from "@/components/ui/hover-card"
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger, } from "@/components/ui/drawer"


const podDetails = [
    { name: "pod-kj21n321hjkfgdgfdgdgdg", namespace: "default", status: "Running", restarts: 2, age: "3d", health: "healthy", labels: { app: "nginx", tier: "frontend" } },
    { name: "pod-das9876dsa65dsa", namespace: "apps-of-app", status: "Pending", restarts: 0, age: "1d", health: "unhealthy", labels: { app: "redis", tier: "backend" } },
    { name: "pod-gsayudkg765akj", namespace: "monitoring", status: "Succeeded", restarts: 1, age: "5d", health: "healthy", labels: { app: "prometheus", tier: "monitoring", } },
]

function Application() {
    return (
        <div className="border-1 border-solid border-cyan-500 p-2 text-gray-600">
            <p className="text-lg font-semibold text-gray-700 pb-2">pod-kj21n321hjkfgdgfdgdgdg</p>
            <hr className="border-cyan-500" />
            <p className="text-l font-semibold flex justify-between pt-2"><span>Namespace</span><span>default</span></p>
            <p className="text-l font-semibold flex justify-between"><span>Status</span><span>Running</span></p>
            <p className="text-l font-semibold flex justify-between"><span>ControllerBy</span><span>DeamonSet</span></p>
            <p className="text-l font-semibold flex justify-between">
                <span>Health</span>
                <span>{false ? <Badge className="bg-green-400">Healthy</Badge> : <Badge className="bg-red-500">Unhealthy</Badge>}</span>
            </p>
            <div>
                <HoverCard>
                    <HoverCardTrigger asChild>
                        <div className="flex justify-between">
                            <p className="text-l font-semibold flex justify-between">Labels(hover on link)</p>
                            <p className="text-l font-semibold flex justify-between">
                                <Badge className="mt-1 h-5 min-w-5 rounded-full px-1 font-mono tabular-nums" variant="outline">17+</Badge>
                            </p>
                        </div>
                    </HoverCardTrigger>
                    <HoverCardContent className="w-80 bg-gray-600">
                        <div className="flex justify-between gap-4">
                            <div className="space-y-1">
                                <Badge className="mr-1" variant="secondary">nginx</Badge>
                                <Badge className="mr-1" variant="secondary">frontend</Badge>
                                <Badge className="mr-1" variant="secondary">redis</Badge>
                                <Badge className="mr-1" variant="secondary">backend</Badge>
                                <Badge className="mr-1" variant="secondary">prometheus</Badge>
                                <Badge className="mr-1" variant="secondary">monitoring</Badge>
                            </div>
                        </div>
                    </HoverCardContent>
                </HoverCard>
            </div>
            <div className="mt-2">
                <ButtonGroup className="w-full flex">
                    <Drawer>
                        <DrawerTrigger asChild>
                            <Button className="flex-1 cursor-pointer" variant="outline">
                                View Logs
                            </Button>
                        </DrawerTrigger>
                        <DrawerContent>
                            <div className="mx-auto">
                                <DrawerHeader>
                                    <DrawerTitle>Move Goal</DrawerTitle>
                                    <DrawerDescription>Set your daily activity goal.</DrawerDescription>
                                </DrawerHeader>
                                <DrawerFooter>
                                    <DrawerClose asChild>
                                        <Button variant="destructive">Cancel</Button>
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
    return (
        <div className="mx-auto max-w-7xl mt-3 grid grid-cols-4 gap-4">
            <Application />
            <Application />
            <Application />
            <Application />
            <Application />
            <Application />
        </div>
    )
}

export { Applications }
