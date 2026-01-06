interface CacheItem<T> {
    value: T;
    expiry: number;
}

export class CacheService {
    private storagePrefix = 'cineva_cache_';
    private memoryCache = new Map<string, CacheItem<any>>();

    set<T>(key: string, value: T, ttlSeconds: number): void {
        const expiry = Date.now() + ttlSeconds * 1000;
        const item: CacheItem<T> = { value, expiry };

        this.memoryCache.set(key, item);

        if (typeof localStorage !== 'undefined') {
            try {
                localStorage.setItem(this.storagePrefix + key, JSON.stringify(item));
            } catch (e) {
                console.warn('LocalStorage failed', e);
            }
        }
    }

    get<T>(key: string): T | null {
        const memItem = this.memoryCache.get(key);
        if (memItem) {
            if (Date.now() < memItem.expiry) {
                return memItem.value;
            } else {
                this.memoryCache.delete(key);
            }
        }

        if (typeof localStorage !== 'undefined') {
            try {
                const stored = localStorage.getItem(this.storagePrefix + key);
                if (stored) {
                    const item: CacheItem<T> = JSON.parse(stored);
                    if (Date.now() < item.expiry) {
                        this.memoryCache.set(key, item);
                        return item.value;
                    } else {
                        localStorage.removeItem(this.storagePrefix + key);
                    }
                }
            } catch (e) {
                return null;
            }
        }

        return null;
    }

    remove(key: string): void {
        this.memoryCache.delete(key);
        if (typeof localStorage !== 'undefined') {
            localStorage.removeItem(this.storagePrefix + key);
        }
    }

    clear(): void {
        this.memoryCache.clear();
        if (typeof localStorage !== 'undefined') {
            Object.keys(localStorage).forEach((key) => {
                if (key.startsWith(this.storagePrefix)) {
                    localStorage.removeItem(key);
                }
            });
        }
    }
}

export const cache = new CacheService();
