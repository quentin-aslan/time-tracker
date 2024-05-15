import {TASKS} from "../mock.ts";
import TasksTable from "../components/TasksTable.tsx";

export default function Dashboard() {

    return (
        <div className={"h-screen bg-base-200 pt-20"}>
            <div className={"flex flex-col gap-5 items-center"}>
                <h1 className={"text-3xl"}>Tasks</h1>
                <div className={"flex flex-row justify-center w-4/5 gap-5"}>
                    <input type="text" placeholder="Type here" className="p-3 border border-black w-full"/>
                    <button className={"btn btn-outline p-3"}>Add</button>
                </div>
                <div className={"w-4/5"}>
                    <TasksTable tasks={TASKS} />
                </div>

            </div>
        </div>
    );
}
