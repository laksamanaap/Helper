import React from "react";

const Table = ({ children }: any) => {
    return <table className="w-full border-separate select-none text-left text-sm">{children}</table>;
};

const TableHeading = ({ children }: any) => (
    <thead className="border-slate-300 [&>tr>th]:border-b">
        <tr className="[&>th]:px-4 [&>th]:py-3 [&>th]:font-medium">{children}</tr>
    </thead>
);

const TableBody = ({ children }: any) => <tbody>{children}</tbody>;

const TableRow = ({ children, onClick, className, hoverStyle }: any) => (
    <tr
        onClick={onClick}
        className={`${className} cursor-pointer rounded-xl ${hoverStyle ? "hover:bg-slate-200/85" : null} active:bg-slate-50 [&>td]:px-4 [&>td]:py-2`}
    >
        {children}
    </tr>
);

const TableColumn = ({ children, className, onClick, colSpan } : any) => (
    <td className={className} colSpan={colSpan} onClick={onClick}>
        {children}
    </td>
);

const TableHead = ({ children }: any) => <th>{children}</th>;

Table.Heading = TableHeading;

Table.Head = TableHead;

Table.Body = TableBody;

Table.Row = TableRow;

Table.Column = TableColumn;

export default Table;
