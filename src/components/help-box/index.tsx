import React from 'react';
import {
  Box,
  IconButton,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
  Text,
  UnorderedList,
  ListItem,
  Link,
} from '@chakra-ui/react';
import { FiInfo } from 'react-icons/fi';
import { useSession } from '@roq/nextjs';

export const HelpBox: React.FC = () => {
  const ownerRoles = ['Ground Station Engineer'];
  const roles = ['Customer', 'Ground Station Engineer', 'Mission Analyst', 'Satellite Operator'];
  const applicationName = 'Mission Operations Center';
  const tenantName = 'Satellite Operator';
  const githubUrl = process.env.NEXT_PUBLIC_GITHUB_URL;
  const userStories = `1. As a Ground Station Engineer, I want to create a Satellite Operator entity so that I can manage satellite operations for my organization.

2. As a Ground Station Engineer, I want to invite Mission Analysts and Satellite Operators to join the Satellite Operator entity so that they can collaborate on satellite operations.

3. As a Ground Station Engineer, I want to manage the access rights of Mission Analysts and Satellite Operators within the Satellite Operator entity so that I can control their level of access to satellite operations.

4. As a Mission Analyst, I want to view satellite data provided by Leanspace APIs so that I can analyze the satellite's performance and make recommendations for improvements.

5. As a Mission Analyst, I want to create and update satellite operation plans based on the analysis of satellite data so that the Satellite Operator can execute the plans.

6. As a Satellite Operator, I want to view and execute satellite operation plans created by Mission Analysts so that I can operate the satellite according to the plan.

7. As a Satellite Operator, I want to update the status of satellite operation plans after execution so that the Mission Analysts and Ground Station Engineer can track the progress of satellite operations.

8. As a Customer, I want to request satellite services from the Satellite Operator entity so that I can utilize the satellite for my business needs.

9. As a Ground Station Engineer, I want to manage and fulfill customer requests for satellite services so that I can ensure customer satisfaction and generate revenue for my organization.`;

  const { session } = useSession();
  if (!process.env.NEXT_PUBLIC_SHOW_BRIEFING || process.env.NEXT_PUBLIC_SHOW_BRIEFING === 'false') {
    return null;
  }
  return (
    <Box width={1} position="fixed" left="30px" bottom="20px" zIndex={3}>
      <Popover placement="top-end">
        <PopoverTrigger>
          <IconButton
            aria-label="Help Info"
            icon={<FiInfo />}
            bg="blue.800"
            color="white"
            _hover={{ bg: 'blue.800' }}
            _active={{ bg: 'blue.800' }}
            _focus={{ bg: 'blue.800' }}
          />
        </PopoverTrigger>
        <PopoverContent w="50vw" h="70vh">
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverHeader>App Briefing</PopoverHeader>
          <PopoverBody overflowY="auto">
            <Text mb="2">Hi there!</Text>
            <Text mb="2">
              Welcome to {applicationName}, your freshly generated B2B SaaS application. This in-app briefing will guide
              you through your application.
            </Text>
            <Text mb="2">You can use {applicationName} with one of these roles:</Text>
            <UnorderedList mb="2">
              {roles.map((role) => (
                <ListItem key={role}>{role}</ListItem>
              ))}
            </UnorderedList>
            {session?.roqUserId ? (
              <Text mb="2">You are currently logged in as a {session?.user?.roles?.join(', ')}.</Text>
            ) : (
              <Text mb="2">
                Right now, you are not logged in. The best way to start your journey is by signing up as{' '}
                {ownerRoles.join(', ')} and to create your first {tenantName}.
              </Text>
            )}
            <Text mb="2">
              {applicationName} was generated based on these user stories. Feel free to try them out yourself!
            </Text>
            <Box mb="2" whiteSpace="pre-wrap">
              {userStories}
            </Box>
            <Text mb="2">
              If you are happy with the results, then you can get the entire source code here:{' '}
              <Link href={githubUrl} color="cyan.500" isExternal>
                {githubUrl}
              </Link>
            </Text>
            <Text mb="2">
              Console Dashboard: For configuration and customization options, access our console dashboard. Your project
              has already been created and is waiting for your input. Check your emails for the invite.
            </Text>
            <Text mb="2">
              <Link href="https://console.roq.tech" color="cyan.500" isExternal>
                ROQ Console
              </Link>
            </Text>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </Box>
  );
};
