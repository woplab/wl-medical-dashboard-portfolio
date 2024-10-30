'use client'
import React from 'react';
import {
    MaterialReactTable,
    useMaterialReactTable,
    type MRT_ColumnDef,
} from 'material-react-table';

import testData from '../data/table.json';

type TestResult = {
    testName: string;
    status: string;
    result: string | null;
    doctor: string;
    date: string;
};

const TestResults = () => {

    const columns: MRT_ColumnDef<TestResult>[] = [
        { accessorKey: 'testName', header: 'Test', size: 200 },
        { accessorKey: 'status', header: 'Status', size: 150 },
        { accessorKey: 'result', header: 'Result', size: 150 },
        { accessorKey: 'doctor', header: 'Doctor', size: 150 },
        { accessorKey: 'date', header: 'Date', size: 150 },
    ];

    const table = useMaterialReactTable({
        columns,
        data: testData,
        muiTablePaperProps: {
            sx: {
                borderRadius: '0.5rem',
                boxShadow: 'none',
            },
        },

        muiTableHeadCellProps: {
            sx: {
                color: '#8BACED',
            },
        }
    });

    return (
        <div className="pt-4 px-8 pb-6">
            <MaterialReactTable
                table={table}
            />
        </div>
    );
};

export default TestResults;
