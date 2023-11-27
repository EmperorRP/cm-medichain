import React from 'react';
import {
  Flex,
  IconButton,
  Spacer,
  HStack,
  Avatar,
  Text
} from '@chakra-ui/react';
import { SettingsIcon, BellIcon } from '@chakra-ui/icons';
import { ColorModeSwitcher } from '../ColorModeSwitcher';

const Navbar = () => {
  return (
    <Flex as="nav" align="center" justify="space-between" wrap="wrap" padding="1rem">
        <Text fontSize='3xl' as="b">MediChain</Text>
        <Spacer />
        <HStack spacing={4}>
          <IconButton
            icon={<BellIcon />}
            aria-label="Notifications"
            variant="ghost"
          />
          <IconButton
            icon={<SettingsIcon />}
            aria-label="Settings"
            variant="ghost"
          />
          <ColorModeSwitcher justifySelf="flex-end" />
          <Avatar size='md' name="Dan Abrahmov" src="https://bit.ly/dan-abramov" />
        </HStack>
    </Flex>
  );
};

export default Navbar;
