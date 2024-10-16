/* eslint-disable @typescript-eslint/no-explicit-any */
import { Text } from '@wayfarer/components';
import * as Styled from './emptyResultsPanel.styles';
import { EmptySearchIcon } from 'assets';

type EmptyResultsPanelTypes = {
  title: string;
};

export default function EmptyResultsPanel({ title }: EmptyResultsPanelTypes) {
  return (
    <Styled.RootContainer>
      <Styled.Container>
        <Styled.EmptySearchContainer>
          <Styled.EmptySearchIcon>
            <EmptySearchIcon />
          </Styled.EmptySearchIcon>
          <Styled.EmptySearchDescription>
            <Text appearance="auto" variant="boldLarge">
              {title}
            </Text>
            <Text appearance="auto" variant="regularBase">
              Use the search or filter options above to find access items.
            </Text>
            <Text appearance="auto" variant="regularBase">
              Your search results will show here.
            </Text>
          </Styled.EmptySearchDescription>
        </Styled.EmptySearchContainer>
      </Styled.Container>
    </Styled.RootContainer>
  );
}
