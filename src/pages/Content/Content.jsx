import SummaryPane from "../../components/SummaryPane/SummaryPane";
import Sidebar from "../../components/Sidebar/Sidebar";
import './Content.css';

export default function Content(){
    return (
        <div className="content">
            <SummaryPane />
            <Sidebar />
        </div>
    )
}