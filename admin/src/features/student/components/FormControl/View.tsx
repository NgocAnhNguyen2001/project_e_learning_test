// chakra imports
import { Button, Flex, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import * as React from "react";
import { useForm } from "react-hook-form";

import { Role, useAdminFindManyUsersLazyQuery, useAdminUpdateUserMutation, useDeleteUserMutation } from "schema/generated/graphql";


import { schemaEdit } from "./Schema/Edit";

import { StudentForm } from "@/features/student/components/StudentForm";


type ElementProps = {
  onSwitch: any,
  user?: any,
};

export const View = (props: ElementProps): React.ReactElement => {
  const {
    user,
    onSwitch,
  } = props;
  const router = useRouter();
  
  React.useEffect(() => {
    if(!user) return;
    reset({
      firstName: user?.firstName ?? '',
      lastName: user?.lastName ?? '',
      email: user?.student?.email ?? '',
      bio: user?.student?.bio ?? '',
      parentEmail: user?.student?.parent?.email ?? '',
      username: user?.student?.username ?? '',
    });
  }, [user]);

  // on user update
  const [updateUser, updatedUser] = useAdminUpdateUserMutation();
  React.useEffect(() => {
    if(!updatedUser.data) return;
    router.push(`../view/${router.query.id}`);
  }, [updatedUser.data?.adminUpdateUser]);
  const handleSubmitRequest = async (data: any): Promise<void> => {
    updateUser({
      variables: {
        where: {
          id: router.query.id as string
        },
        data: {
          student: {
            update: {
              email: { set: data.email },
              username: { set: data.username },
              bio: { set: data.bio },
              parent: {
                connect: { email: data.parentEmail },
              },
            },
          },
          firstName: { set: data.firstName },
          lastName: { set: data.lastName },
        }
      }
    }).catch(err => err);
  }
  
  // Parent auto complete
  const [findManyUsers, parents] = useAdminFindManyUsersLazyQuery();
  const {
    register,
    handleSubmit,
    formState: {
      errors,
      isDirty,
    },
    reset,
    watch,
    getValues,
  } = useForm({
    resolver: zodResolver(schemaEdit),
  });
  React.useEffect(() => {
    const partialEmail = getValues('parentEmail');
    if(!partialEmail) return;
    findManyUsers({
      variables: {
        where: {
          role: { equals: Role.Parent },
          parent: {
            is: {
              email: {
                contains: partialEmail,
              },
            },
          },
        },
        take: 5,
      },
    })
  }, [watch('parentEmail')]);

  const [displayDelete, setDisplayDelete] = React.useState(false);
  const [confirmText, setConfirmText] = React.useState('');
  const [deleteUser, deletedUser] = useDeleteUserMutation();
  React.useEffect(() => {
    if(!deletedUser.data?.deleteUser) return;
    router.back();
  }, [deletedUser.data?.deleteUser]);
  const onClose = (): void => {
    setConfirmText('');
    setDisplayDelete(false);
  }
  const readonly = true;
  let args: any = {
    inputProps: {
      firstName: register('firstName'),
      lastName: register('lastName'),
      bio: register('bio'),
      email: register('email'),
      parentEmail: register('parentEmail'),
      username: register('username'),
    },
    description: `Information about ${user?.firstName} ${user?.lastName}`,
    ...(readonly ? {
      title: 'View',
      readonly,
      buttons: (
        <>
          <Flex direction="row" py="4" px={{ base: '4', md: '6' }} justifyContent="right">
            <Button type="button" variant="primary" onClick={(): any => onSwitch()}>
              Edit
            </Button>
            <Button type="button" variant="primary" textColor="red" onClick={(): any => setDisplayDelete(true)}>
              Delete
            </Button>
          </Flex>
          <Modal
            isOpen={displayDelete}
            onClose={onClose}
          >
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Delete User</ModalHeader>
              <ModalCloseButton />
              <ModalBody pb={6}>
                <FormControl>
                  <FormLabel>
                    <Text pb={6}>This will permanently delete user <b>{`${user?.firstName} ${user?.lastName}`}</b> and all associated information related to them</Text>
                    <Text pb={6}>Please type <b>{`${user?.firstName} ${user?.lastName}`}</b> to confirm</Text>
                    <Text pb={6} textColor="red">This action <b>cannot</b> be undone</Text>
                  </FormLabel>
                  <Input
                    value={confirmText}
                    onChange={(e): any => setConfirmText(e.target.value)}
                  />
                </FormControl>
              </ModalBody>
              <ModalFooter>
                <Button
                  colorScheme='red'
                  mr={3}
                  disabled={confirmText !== `${user?.firstName} ${user?.lastName}`}
                  onClick={(): any => deleteUser({
                    variables: { where: { id: user?.id } },
                  })}
                >
                  Delete
                </Button>
                <Button onClick={onClose}>Cancel</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </>
      ),
    } : {
      title: 'Edit',
      errors,
      onSubmit: handleSubmit(handleSubmitRequest),
      buttons: (
        <Flex direction="row" py="4" px={{ base: '4', md: '6' }} justifyContent="right">
          <Button type="button" variant="primary" disabled={!isDirty} onClick={(): any => reset()}>
            Reset
          </Button>
          <Button type="submit" variant="primary" disabled={!isDirty}>
            Save
          </Button>
        </Flex>
      ),
      parentAutoComplete: parents.data?.adminFindManyUsers.map(user => {
        return user.parent?.email as string;
      }),
    })
  };
  if(readonly){
    args = {
      ...args,
      title: 'View',
      description: `Information about ${user?.firstName} ${user?.lastName}`,
      readonly: true,
      buttons: (
        <>
          <Flex direction="row" py="4" px={{ base: '4', md: '6' }} justifyContent="right">
            <Button type="button" variant="primary" onClick={(): any => onSwitch()}>
              Edit
            </Button>
            <Button type="button" variant="primary" textColor="red" onClick={(): any => setDisplayDelete(true)}>
              Delete
            </Button>
          </Flex>
          <Modal
            isOpen={displayDelete}
            onClose={onClose}
          >
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Delete User</ModalHeader>
              <ModalCloseButton />
              <ModalBody pb={6}>
                <FormControl>
                  <FormLabel>
                    <Text pb={6}>This will permanently delete user <b>{`${user?.firstName} ${user?.lastName}`}</b> and all associated information related to them</Text>
                    <Text pb={6}>Please type <b>{`${user?.firstName} ${user?.lastName}`}</b> to confirm</Text>
                    <Text pb={6} textColor="red">This action <b>cannot</b> be undone</Text>
                  </FormLabel>
                  <Input
                    value={confirmText}
                    onChange={(e): any => setConfirmText(e.target.value)}
                  />
                </FormControl>
              </ModalBody>
              <ModalFooter>
                <Button
                  colorScheme='red'
                  mr={3}
                  disabled={confirmText !== `${user?.firstName} ${user?.lastName}`}
                  onClick={(): any => deleteUser({
                    variables: { where: { id: user?.id } },
                  })}
                >
                  Delete
                </Button>
                <Button onClick={onClose}>Cancel</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </>
      ),
    }
  }
  return (
    <StudentForm {...args}/>
  );
};
