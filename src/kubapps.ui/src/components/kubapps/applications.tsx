import { Accordion, AccordionContent, AccordionItem, AccordionTrigger, } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Button } from "../ui/button"
import { Separator } from "@radix-ui/react-select"
import { ButtonGroup } from "@/components/ui/button-group"

const podDetails = [
    { name: "pod-kj21n321hjkfgdgfdgdgdg", namespace: "default", status: "Running", restarts: 2, age: "3d", health: "healthy" },
    { name: "pod-das9876dsa65dsa", namespace: "apps-of-app", status: "Pending", restarts: 0, age: "1d", health: "unhealthy" },
    { name: "pod-gsayudkg765akj", namespace: "monitoring", status: "Succeeded", restarts: 1, age: "5d", health: "healthy" },
]

function Application() {
    return (
        <div className="border-1 border-solid border-gray-300 p-2">
            <p className="text-lg font-semibold text-gray-700 pb-2">pod-kj21n321hjkfgdgfdgdgdg</p>
            <hr className="border-cyan-200" />
            <p className="text-l font-semibold text-gray-600 flex justify-between pt-2"><span>Namespace</span><span>default</span></p>
            <p className="text-l font-semibold text-gray-600 flex justify-between"><span>Status</span><span>Running</span></p>
            <p className="text-l font-semibold text-gray-600 flex justify-between"><span>ControllerBy</span><span>DeamonSet</span></p>
            <p className="text-l font-semibold text-gray-600 flex justify-between">
                <span>Health</span>
                <span>{false ? <Badge className="bg-green-400">Healthy</Badge> : <Badge className="bg-red-500">Unhealthy</Badge>}</span>
            </p>
            <div className="mt-2">
                <ButtonGroup className="w-full flex">
                    <Button className="flex-1 cursor-pointer" variant="outline">
                        View Logs
                    </Button>
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
