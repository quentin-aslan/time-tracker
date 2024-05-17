import TasksList from "../components/TasksList.tsx";

export default function Dashboard() {
    return (
        <div className={"h-screen bg-base-200 pt-20"}>
            <TasksList />
        </div>
    );
}
