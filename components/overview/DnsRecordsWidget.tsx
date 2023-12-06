import { XSquareIcon } from 'lucide-react';
import React, { FC } from 'react';

import DashboardItem from '@/components/overview/DashboardItem';
import DnsLookup from '@/utils/DnsLookup';

import RecordList from './RecordList';

interface DnsRecordsWidgetProps {
  type:
    | 'A'
    | 'AAAA'
    | 'CAA'
    | 'CNAME'
    | 'DNSKEY'
    | 'DS'
    | 'MX'
    | 'NAPTR'
    | 'NS'
    | 'PTR'
    | 'SOA'
    | 'SRV'
    | 'TXT';
  domain: string;
}

const DnsRecordsWidget: React.FC<DnsRecordsWidgetProps> = async ({
  type,
  domain,
}): Promise<React.ReactElement> => {
  const lookup = new DnsLookup();

  const records = await lookup.fetchRecords(domain, type);

  return (
    <DashboardItem title={type + '-Records'}>
      <div className={`flex h-full`}>
        {Object.values(records).length === 0 ? (
          <div className="m-auto">
            <XSquareIcon className="h-10 w-10" />
          </div>
        ) : (
          <ul className="list-inside list-disc text-lg font-medium text-slate-900 dark:text-slate-100">
            {Object.values(records).map((record) => {
              return (
                <li key={record.data.split(' ')[1]}>
                  {type == 'MX' ? (
                    <a
                      className="cursor-pointer decoration-slate-700 decoration-dotted underline-offset-4 hover:underline dark:decoration-slate-300"
                      href={`/lookup/${record.data.split(' ')[1]}`}
                    >
                      {record.data.split(' ')[1]}
                    </a>
                  ) : (
                    <RecordList record={record.data} />
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </DashboardItem>
  );
};

export default DnsRecordsWidget;