import TasksList from "../components/TasksList.tsx";

export default function Dashboard() {
    return (
        <div className={"h-screen bg-neutral-100 pt-20"}>
            <TasksList />
        </div>
    );
}
