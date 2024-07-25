"use client";

import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import TldrawComponent from "./tldrawComponent";
import Sidepanel from "./sidepanel";
import Image from "next/image";
import { DragIcon } from "@repo/ui/icons";
import { useRef, useState } from "react";

export default function ResizableLayout({ id }: { id: string }) {
	const panelGroupRef = useRef(null);
	const [isLeftPanelCollapsed, setIsLeftPanelCollapsed] = useState(false);

	const handleResize = () => {
		if (isLeftPanelCollapsed && panelGroupRef.current) {
			panelGroupRef.current.setLayout([20, 80]);
		}
	};

	return (
		<PanelGroup
			className="text-white h-screen py-[1vh] px-[1vh] bg-[#111417]"
			direction="horizontal"
			ref={panelGroupRef}
			onLayout={(sizes) => {
				setIsLeftPanelCollapsed(sizes[0] === 0);
			}}
		>
			<Panel collapsible={true} defaultSize={30} minSize={20}>
				<Sidepanel />
			</Panel>
			<PanelResizeHandle onClick={handleResize} className="w-4 h-[98vh] relative">
				<div
					className={`rounded-lg bg-[#2F363B] absolute top-1/2 -translate-y-1/2 px-1 transition-all py-2`}
				>
					<Image src={DragIcon} alt="drag-icon" />
				</div>
			</PanelResizeHandle>
			<Panel defaultSize={70} minSize={60}>
				<div className="relative w-full h-[98vh] rounded-xl overflow-hidden">
					<TldrawComponent id={id} />
				</div>
			</Panel>
		</PanelGroup>
	);
}
