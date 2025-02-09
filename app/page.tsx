'use client'
import React from "react";
import { AgGridReact } from "ag-grid-react";

import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { generateRandomAgentData } from "./func";

ModuleRegistry.registerModules([AllCommunityModule]);

// 숫자에 콤마를 추가하는 포매터 (예: 1000 -> "1,000")
const numberFormatter = (params: { value: any }) => {
  if (params.value === undefined || params.value === null) return '';
  return typeof params.value === 'number' ? params.value.toLocaleString() : params.value;
};

// AG Grid의 컬럼 정의 업데이트
const columnDefs = [
  {
    headerName: "Rank",
    // 현재 표출 순서에 따라 동적으로 순위 계산 (원본 데이터의 rank는 사용하지 않음)
    valueGetter: (params: any) => params.node ? params.node.rowIndex + 1 : '',
    sortable: true,
    filter: true,
    width: 80,
    valueFormatter: numberFormatter
  },
  { headerName: "Model", field: "model", sortable: true, filter: true },
  { headerName: "Strategy", field: "strategy", sortable: true, filter: true },
  { headerName: "Capital", field: "capital", sortable: true, filter: true, valueFormatter: numberFormatter },
  { headerName: "Total Investment", field: "totalInvestment", sortable: true, filter: true, valueFormatter: numberFormatter },
  { headerName: "Trade Count", field: "tradeCount", sortable: true, filter: true, valueFormatter: numberFormatter },
  { headerName: "Win Rate (%)", field: "winRate", sortable: true, filter: true, valueFormatter: numberFormatter },
  {
    headerName: "Return Rate (%)",
    field: "returnRate",
    sortable: true,
    filter: true,
    sort: 'desc', // 초기 정렬: Return Rate가 높은 항목이 위로 오도록 설정
    valueFormatter: numberFormatter
  },
  { headerName: "Avg Investment", field: "avgInvestment", sortable: true, filter: true, valueFormatter: numberFormatter },
  { headerName: "Net Profit", field: "netProfit", sortable: true, filter: true, valueFormatter: numberFormatter }
];

// AG Grid에 사용할 모의 데이터 생성
const rowData = generateRandomAgentData();

const Page = () => {
  const [activeTab, setActiveTab] = React.useState<'battle' | 'leaderboard'>('battle');

  return (
    <div className="w-full h-screen bg-white">
      <div className="w-full h-full px-28 py-20">
        {/* Tab Header */}
        <div className="flex border-b border-gray-200 mb-12">
          <button
            onClick={() => setActiveTab('battle')}
            className={`${activeTab === 'battle'
              ? 'border-blue-500 text-blue-500 font-bold'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} text-[20px] pb-4 px-1 border-b-2`}
          >
            Request a battle!
          </button>
          <button
            onClick={() => setActiveTab('leaderboard')}
            className={`${activeTab === 'leaderboard'
              ? 'border-blue-500 text-blue-500 font-bold'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} text-[20px] ml-8 pb-4 px-1 border-b-2`}
          >
            Leaderboard
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === 'battle' ? (
          <div>
            {/* Input Token CA */}
            <div className="w-full flex flex-col gap-y-6 lg:gap-y-0 lg:gap-x-6 mb-[48px]">
              <span className="text-[18px] font-semibold mb-[8px]">Token CA</span>
              <input type="text" placeholder="Input Token CA" className="w-full h-[40px] p-4 bg-gray-100 border border-gray-300 rounded-[2px]" />
            </div>

            {/* Select Date Range */}
            <div className="w-full flex flex-col gap-y-6 lg:gap-y-0 lg:gap-x-6 mb-[48px]">
              <span className="text-[18px] font-semibold mb-[8px]">Select Date Range</span>
              <div className="flex gap-x-6">
                <input 
                  type="date" 
                  placeholder="InputStart Date"
                  className="w-full h-[40px] p-4 bg-gray-100 border border-gray-300 rounded-[2px]" 
                />
                <input 
                  type="date" 
                  placeholder="InputEnd Date"
                  className="w-full h-[40px] p-4 bg-gray-100 border border-gray-300 rounded-[2px]" 
                />
              </div>
            </div>

            {/* Input Role & Prompt */}
            <div className="w-full flex flex-col lg:flex-row gap-y-6 lg:gap-y-0 lg:gap-x-6 mb-[36px] lg:mb-[24px]">
              <div className="w-full flex flex-col gap-4">
                <span className="text-[18px] font-semibold">Role</span>
                <textarea placeholder="Input Role" className="w-full h-[300px] p-4 bg-gray-100 border border-gray-300 rounded-[2px]" />
              </div>
              <div className="w-full flex flex-col gap-4">
                <span className="text-[18px] font-semibold">Prompt</span>
                <textarea placeholder="Input Prompt" className="w-full h-[300px] p-4 bg-gray-100 border border-gray-300 rounded-[2px]" />
              </div>
            </div>

            {/* Submit Button */}
            <div className="w-full flex justify-end mb-[64px]">
              <button className="w-full lg:w-auto bg-blue-500 text-white px-4 py-2 rounded-[2px]">Submit</button>
            </div>
          </div>
        ) : (
          <div className="ag-theme-alpine w-full h-full">
            <AgGridReact
              rowData={rowData}
              columnDefs={columnDefs as any}
              rowHeight={36}      // 각 행의 높이
              domLayout="autoHeight" // 컨텐츠 높이에 맞춰 자동 조절
              headerHeight={40}   // 헤더 높이 설정
              getRowClass={(params) =>
                (params.node?.rowIndex ?? 0) % 2 === 1 ? 'odd-row' : ''
              }
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
