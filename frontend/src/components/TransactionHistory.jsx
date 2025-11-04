import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';

const TransactionHistory = ({ transactions }) => {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-lg">Recent Transactions</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[600px] pr-4">
          {transactions.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <p>No transactions yet</p>
            </div>
          ) : (
            <div className="space-y-3">
              {transactions.map((transaction, index) => (
                <div
                  key={index}
                  className={`p-3 rounded-lg border ${
                    transaction.type === 'income'
                      ? 'bg-green-50 border-green-200'
                      : 'bg-red-50 border-red-200'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          transaction.type === 'income' ? 'bg-green-200' : 'bg-red-200'
                        }`}
                      >
                        <span className="text-sm">
                          {transaction.type === 'income' ? '💵' : transaction.icon || '💰'}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-sm text-gray-800">{transaction.title}</p>
                        <p className="text-xs text-gray-500">{transaction.category}</p>
                        <p className="text-xs text-gray-400">{transaction.date}</p>
                      </div>
                    </div>
                    <div
                      className={`font-bold text-sm ${
                        transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                      }`}
                    >
                      {transaction.type === 'income' ? '+' : '-'}${transaction.amount.toFixed(2)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default TransactionHistory;
