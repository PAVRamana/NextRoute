/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Providers,
  ProviderState,
  SimpleProvider,
} from '@microsoft/mgt-element';
import { HeaderNavBar } from 'exp-ui-web-components-mfe';

import { useEffect, useState } from 'react';
import { AnnouncementsType } from 'mocks/data/announcements';
import { useGetAddAccessData } from 'packages/common/add-access-provider-context';
import api from 'packages/common/service/axios';
import { URL } from 'packages/util';

export default function HeaderPanel() {
  const [announcementData, setAnnouncementMsg] = useState<AnnouncementsType>();
  const [notificationStatus, setNotificationStatus] = useState<any>({
    notificationStatus: false,
  });

  const configData = useGetAddAccessData();

  useEffect(() => {
    api.get(URL.getToken).then((response) => {
      if (response && response?.data && response?.data?.tokenResponse) {
        const tokenData = JSON.parse(response?.data?.tokenResponse);
        // eslint-disable-next-line no-unused-vars
        Providers.globalProvider = new SimpleProvider(
          (_scopes: string[]): Promise<string> => {
            return new Promise((resolve) => {
              resolve(tokenData?.access_token);
            });
          }
        );
        Providers.globalProvider.setState(ProviderState.SignedIn);
      }
    });
  }, [configData]);

  useEffect(() => {
    void fetchAnouncements();
  }, []);

  const fetchAnouncements = () => {
    api.get(URL.announcementMsg).then((response) => {
      setAnnouncementMsg(response?.data);
    });
  };

  const onClickLogout = () => {
    api.get(URL.logout).then((response) => {
      window.open(response?.data as unknown as string, '_self');
    });
  };

  const onClickNotification = (value: any) => {
    setNotificationStatus({ notificationStatus: value.data });
  };

  const setNotificationStatusVal = (value: any) => {
    setNotificationStatus({ notificationStatus: value.data });
  };

  return (
    <>
      {configData && (
        <HeaderNavBar
          commonLabels={configData?.labels?.commonLabels}
          homePageLabels={configData?.labels?.homePage}
          loginUserDetails={configData?.loginUserDetails}
          onClickLogout={onClickLogout}
          showNotifications={configData?.config?.showNotifications}
          helpUrl={configData?.config?.helpUrl}
          email={configData?.loginUserDetails?.email}
          onClickNotification={onClickNotification}
          homeInfo={notificationStatus}
          setNotificationStatusVal={setNotificationStatusVal}
          annoucements={announcementData}
        />
      )}
    </>
  );
}

import { Person, AvatarSize } from '@microsoft/mgt-react';

type PersonCardTypes = {
  email: string;
  avatarSize?: AvatarSize;
};

export default function PersonCard({ email, avatarSize }: PersonCardTypes) {
  return (
    <Person
      personQuery={email}
      showPresence={true}
      personCardInteraction={1}
      view={2}
      avatarSize={avatarSize ?? 'large'}
    />
  );
}
