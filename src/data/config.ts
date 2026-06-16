// src/data/config.ts
// Use EXPO_PUBLIC_USE_MOCK=false to enable Firebase-backed services.
function parseBooleanEnv(value: string | undefined, defaultValue: boolean): boolean {
	if (value == null) return defaultValue;

	const normalized = value.trim().toLowerCase();
	if (normalized === 'true' || normalized === '1' || normalized === 'yes' || normalized === 'on') {
		return true;
	}

	if (normalized === 'false' || normalized === '0' || normalized === 'no' || normalized === 'off') {
		return false;
	}

	return defaultValue;
}

export const USE_MOCK = parseBooleanEnv(process.env.EXPO_PUBLIC_USE_MOCK, true);
