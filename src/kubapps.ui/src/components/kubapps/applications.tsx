import { Accordion, AccordionContent, AccordionItem, AccordionTrigger, } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Button } from "../ui/button"

const podDetails = [
    { name: "pod-kj21n321hjkg", status: "Running", restarts: 2, age: "3d" },
    { name: "pod-das9876dsa65dsa", status: "Pending", restarts: 0, age: "1d" },
    { name: "pod-gsayudkg765akj", status: "Succeeded", restarts: 1, age: "5d" }
]

function Applications() {
    return (
        <div className="mx-auto max-w-7xl mt-3" >
            <Accordion
                type="single"
                collapsible
                className="w-full"
                defaultValue="item-1"
            >
                {podDetails.map((pod) => (
                    <AccordionItem key={pod.name} value={pod.name}>
                        <AccordionTrigger>{pod.name}</AccordionTrigger>
                        <AccordionContent className="flex flex-col gap-4 text-balance">
                            <div className="flex justify-between">
                                <h5 className="text-lg font-medium">namespace: app-of-apps</h5>
                                <h5 className="text-lg font-medium"><Badge variant="secondary" className="bg-green-500 text-white dark:bg-blue-600">status: {pod.status}</Badge></h5>
                                <h5 className="text-lg font-medium">controller-by: deamonSet</h5>
                            </div>
                            <div className="flex justify-between">
                                <h5 className="text-lg font-medium">service-account: app-controller</h5>
                                <div>
                                    <Button variant="outline" className="cursor-pointer mr-2 text-white bg-blue-500 hover:bg-blue-500">port foward</Button>
                                    <Button variant="outline" className="cursor-pointer">view logs</Button>
                                </div>
                            </div>

                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </div>
    )
}

export { Applications }
