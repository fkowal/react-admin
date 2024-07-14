import { Contact } from '../types';
import { getAvatarUrl, hash } from './getContactAvatar';
import { test, expect } from 'vitest';

test('should return gravatar URL for anthony@marmelab.com', async () => {
    const email = 'anthony@marmelab.com';
    const record: Partial<Contact> = { email };

    const avatarUrl = await getAvatarUrl(record);
    const hashedEmail = await hash(email);
    expect(avatarUrl).toBe(
        `https://www.gravatar.com/avatar/${hashedEmail}?d=404`
    );
});

test('should return favicon URL if gravatar does not exist', async () => {
    const email = 'no-gravatar@wikipedia.com';
    const record: Partial<Contact> = { email };

    const avatarUrl = await getAvatarUrl(record);
    expect(avatarUrl).toBe('https://wikipedia.com/favicon.ico');
});

test('should not return favicon URL if not domain not allowed', async () => {
    const email = 'no-gravatar@google.com';
    const record: Partial<Contact> = { email };

    const avatarUrl = await getAvatarUrl(record);
    expect(avatarUrl).toBeNull();
});

test('should return null if no email is provided', async () => {
    const record: Partial<Contact> = {};

    const avatarUrl = await getAvatarUrl(record);
    expect(avatarUrl).toBeNull();
});

test('should return null if email has no gravatar or validate domain', async () => {
    const email = 'anthony@fake-domain-marmelab.com';
    const record: Partial<Contact> = { email };

    const avatarUrl = await getAvatarUrl(record);
    expect(avatarUrl).toBeNull();
});
