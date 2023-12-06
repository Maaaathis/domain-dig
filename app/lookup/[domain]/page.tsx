import { FC, ReactElement } from 'react';
import whoiser from 'whoiser';

import { isAvailable } from '@/lib/whois';

import DomainNotRegistered from '../../../components/DomainNotRegistered';
import DnsRecordsWidget from '../../../components/overview/DnsRecordsWidget';
import DomainDatesWidget from '../../../components/overview/DomainDatesWidget';
import DomainlabelWidget from '../../../components/overview/DomainlabelWidget';
import DomainOwnerInfoWidget from '../../../components/overview/DomainOwnerInfoWidget';
import NameserverWidget from '../../../components/overview/NameserverWidget';

export const fetchCache = 'default-no-store';

interface LookupDomainProps {
  params: {
    domain: string;
  };
}

const LookupDomain: FC<LookupDomainProps> = async ({
  params: { domain },
}): Promise<ReactElement> => {
  // @ts-ignore
  const whoisResult = whoiser.firstResult(
    await whoiser(domain, {
      timeout: 3000,
    })
  );

  if ((await isAvailable(domain)) !== 'registered') {
    return <DomainNotRegistered />;
  }

  return (
    <>
      <div className="grid gap-4 md:grid-cols-8">
        <DomainDatesWidget domain={domain} />
        <DomainOwnerInfoWidget domain={domain} />
        <DomainlabelWidget domain={domain} />
        <NameserverWidget domain={domain} />
        <DnsRecordsWidget type="MX" domain={domain} />
        <DnsRecordsWidget type="A" domain={domain} />
      </div>
    </>
  );
};

export default LookupDomain;